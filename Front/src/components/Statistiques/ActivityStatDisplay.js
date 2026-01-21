import React from 'react';
import { fetchActivityStatOfType } from "../../services/stat/ActivityStatActions";
import { Form } from "react-bootstrap";
import { Oval } from "react-loading-icons";
import { fetchListTeams } from "../../services/Team/TeamActions";
import { fetchListLaboratories } from "../../services/laboratory/LaboratoryActions";
import { fetchListInstitutions } from "../../services/institution/InstitutionActions";
import { useGenerateImage } from "recharts-to-png";

import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Funnel,
    FunnelChart,
    Label,
    LabelList,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    // PolarAngleAxis,
    // PolarGrid,
    // PolarRadiusAxis,
    // Radar,
    // RadarChart,
    ResponsiveContainer,
    Tooltip,
    Treemap,
    XAxis,
    YAxis
} from "recharts";
import getRandomBackgroundColor from "../util/ColorGenerator";
import SelectFilterDisplay from "./SelectFilterDisplay";
import FileSaver from "file-saver";
import { AiOutlineDownload } from "react-icons/ai";

export default function ActivityStatDisplay({ activityStatEntry }) {
    const [teamIdMap, setTeamIdMap] = React.useState({});
    const [laboratoryIdMap, setLaboratoryIdMap] = React.useState({});
    const [institutionIdMap, setInstitutionIdMap] = React.useState({});

    const [activityStatList, dispatchActivityStatList] = React.useReducer((state, action) => {
        if (action.idTypeActivity !== activityStatEntry.idTypeActivity) {
            return state;
        }
        switch (action.type) {
            case 'set':
                return action.payload;
            case 'add':
                return [...state, action.payload];
            default:
                return state;
        }
    }, []);

    const [activityStatFilteredList, setActivityStatFilteredList] = React.useState([]);
    const [isChargingMetaList, setChargingMetaList] = React.useState(false);
    const [isChargingActivities, setChargingActivities] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(isChargingActivities || isChargingMetaList);
    }, [isChargingActivities, isChargingMetaList]);

    const groupByNoneCallback = React.useCallback((_activityStat) => {
        return [
            {
                groupKey: 20,
                groupLabel: 'Total',
            }
        ]
    }, []);

    const groupByTeamCallback = React.useCallback((activityStat) => {
        return activityStat.teamIds.map((teamId) => {
            return {
                groupKey: teamId,
                groupLabel: teamIdMap[teamId] ? teamIdMap[teamId].teamName : 'Team id ' + teamId,
            }
        })
    }, [teamIdMap]);

    const groupByLaboratoryCallback = React.useCallback((activityStat) => {
        return activityStat.teamIds.map((teamId, index) => {
            let team = teamIdMap[teamId];
            if (team) {
                let laboratoryId = team.laboratoryId;
                return {
                    groupKey: laboratoryId,
                    groupLabel: laboratoryIdMap[laboratoryId] ? laboratoryIdMap[laboratoryId].laboratoryName : 'Laboratory id ' + laboratoryId,
                }
            }
            return {
                groupKey: index,
                groupLabel: 'No laboratory for team id ' + teamId,
            }
        })
    }, [teamIdMap, laboratoryIdMap]);

    const groupByInstitutionCallback = React.useCallback((activityStat) => {
        return activityStat.teamIds.map((teamId, index) => {
            let team = teamIdMap[teamId];
            if (team) {
                let laboratoryId = team.laboratoryId;
                let laboratory = laboratoryIdMap[laboratoryId];
                if (laboratory) {
                    let institutionId = laboratory.institutionId;
                    return {
                        groupKey: institutionId,
                        groupLabel: institutionIdMap[institutionId] ? institutionIdMap[institutionId].institutionName : 'Institution id ' + institutionId,
                    }
                }
            }
            return {
                groupKey: index,
                groupLabel: 'No institution for team id ' + teamId,
            }
        })
    }, [teamIdMap, laboratoryIdMap, institutionIdMap]);

    const groupByList = React.useMemo(() => [
        { key: 'none', label: 'No group', checked: true, callbackGroupBy: groupByNoneCallback },
        { key: 'team', label: 'Equipe', callbackGroupBy: groupByTeamCallback },
        { key: 'laboratory', label: 'Laboratoire', callbackGroupBy: groupByLaboratoryCallback },
        { key: 'institution', label: 'Institution', callbackGroupBy: groupByInstitutionCallback },
        ...(activityStatEntry.customGroupByList || [])
    ], [activityStatEntry, groupByNoneCallback,
        groupByTeamCallback, groupByLaboratoryCallback,
        groupByInstitutionCallback]);

    const [groupBy, setGroupBy] = React.useState(groupByList[0]);
    const [groupBy2, setGroupBy2] = React.useState(groupByList[0]);

    React.useEffect(() => {
        setGroupBy(groupByList[0]);
        setGroupBy2(groupByList[0]);
        setFilters({});
    }, [groupByList]);

    const [filters, setFilters] = React.useState({});

    // To manage local filters state before applying them
    const [localFilters, setLocalFilters] = React.useState({});


    const [chartOptions, setChartOptions] = React.useState({
        data: [],
        dataNameMap: {},
        chartWidth: 1500,
        chartHeight: 300,
        showCountLabel: true,
        showPercentageLabel: false,
        group2KeyToLabelMap: {},
    });

    const handleChartOptionChange = (event) => {
        const { name, value, type, checked } = event.target;
        setChartOptions(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const [chartTemplateList] = React.useState([
        { key: 'bar', label: 'Bar chart', checked: true },
        { key: 'barStack', label: 'Bar stack chart', isStack: true },
        { key: 'pie', label: 'Pie chart' },
        // { key: 'radar', label: 'Radar chart' },
        { key: 'line', label: 'Line chart' },
        { key: 'area', label: 'Area chart' },
        { key: 'treemap', label: 'Treemap chart' },
        // { key: 'funnel', label: 'Funnel chart' },
    ]);
    const [chartTemplate, setChartTemplate] = React.useState(chartTemplateList[0]);

    // handle download to png file
    const getPngFileName = React.useCallback(() => {
        let fileName = activityStatEntry.label;
        if (groupBy.key !== 'none') {
            fileName += ' - Par ' + groupBy.label;
        }
        if (groupBy2.key !== 'none') {
            fileName += ' - Par ' + groupBy2.label;
        }
        fileName += ' _ ' + chartTemplate.label;
        fileName += ' - ' + chartOptions.chartWidth + 'x' + chartOptions.chartHeight;
        return fileName;
    }, [activityStatEntry, chartTemplate, chartOptions, groupBy, groupBy2]);

    // Un hook par type de graphique, tous via useGenerateImage
    const [getBarChartPng, { ref: barChartWrapperRef }] = useGenerateImage();
    const [getBarStackChartPng, { ref: barStackWrapperRef }] = useGenerateImage();
    const [getPieChartPng, { ref: pieChartWrapperRef }] = useGenerateImage();
    //const [getRadarChartPng, { ref: radarChartWrapperRef }] = useGenerateImage();
    const [getLineChartPng, { ref: lineChartWrapperRef }] = useGenerateImage();
    const [getAreaChartPng, { ref: areaChartWrapperRef }] = useGenerateImage();
    const [getFunnelChartPng, { ref: funnelChartWrapperRef }] = useGenerateImage();
    const [getTreemapChartPng, { ref: treemapChartWrapperRef }] = useGenerateImage();


    const [isPngLoading, setIsPngLoading] = React.useState(false);

    const handleChartDownload = React.useCallback(
        async (getPngCallBack) => {
            setIsPngLoading(true);

            const png = await getPngCallBack();
            console.log("Résultat getPngCallBack :", png?.slice?.(0, 50) || png);

            setIsPngLoading(false);

            if (!png) {
                console.error("Impossible de générer le PNG (png === undefined).");
                return;
            }

            FileSaver.saveAs(png, getPngFileName() + ".png");
        },
        [getPngFileName]
    );

    const renderDownloadButton = (chartTemplateKey) => {
        return (
            <button
                className={'btn btn-primary'}
                disabled={isPngLoading}
                onClick={() => {
                    switch (chartTemplateKey) {
                        case 'bar':
                            handleChartDownload(getBarChartPng);
                            break;
                        case 'barStack':
                            handleChartDownload(getBarStackChartPng);
                            break;
                        case 'pie':
                            handleChartDownload(getPieChartPng);
                            break;
                        // case 'radar':
                        //     handleChartDownload(getRadarChartPng);
                        //     break;
                        case 'line':
                            handleChartDownload(getLineChartPng);
                            break;
                        case 'area':
                            handleChartDownload(getAreaChartPng);
                            break;
                        case 'funnel':
                            handleChartDownload(getFunnelChartPng);
                            break;
                        case 'treemap':
                            handleChartDownload(getTreemapChartPng);
                            break;
                        default:
                            break;
                    }
                }}
            >
                {isPngLoading ?
                    <>
                        <Oval
                            className={"ml-2"}
                            width={20} height={20}
                        />
                        Chargement...
                    </> :
                    <>
                        <AiOutlineDownload />
                        Télécharger le graphique
                    </>
                }
            </button>
        )
    };

    React.useEffect(() => {
        setChargingActivities(true);
        fetchActivityStatOfType(activityStatEntry.idTypeActivity).then((activityStatSum) => {
            dispatchActivityStatList({
                type: 'set',
                payload: activityStatEntry.prepareData(activityStatSum),
                idTypeActivity: activityStatEntry.idTypeActivity,
            });
        }).finally(() => {
            setChargingActivities(false);
        })
    }, [activityStatEntry, dispatchActivityStatList]);

    React.useEffect(() => {
        setChargingMetaList(true);
        Promise.all([
            fetchListTeams(),
            fetchListLaboratories(),
            fetchListInstitutions(),
        ])
            .then(([teamList, labList, institutionList]) => {
                setTeamIdMap(teamList.reduce((map, obj) => {
                    map[obj.teamId] = obj;
                    return map;
                }, {}));
                setLaboratoryIdMap(labList.reduce((map, obj) => {
                    map[obj.laboratoryId] = obj;
                    return map;
                }, {}));
                setInstitutionIdMap(institutionList.reduce((map, obj) => {
                    map[obj.institutionId] = obj;
                    return map;
                }, {}));
            })
            .finally(() => {
                setChargingMetaList(false);
            });
    }, []);

    const handleSelectLocalFilterChange = React.useCallback((filter, selectedOptionsValues) => {
        setLocalFilters((prevFilters) => ({
            ...prevFilters,
            [filter.key]: {
                callbackFilter: filter.callbackFilter,
                value: selectedOptionsValues,
            },
        }));
    }, []);

    const handleLocalFilterChange = React.useCallback((filter, value) => {
        setLocalFilters((prevFilters) => ({
            ...prevFilters,
            [filter.key]: {
                callbackFilter: filter.callbackFilter,
                value: value,
            },
        }));
    }, []);

    const handleApplyFilters = React.useCallback(() => {
        setFilters(localFilters);
    }, [localFilters]);

    React.useEffect(() => {
        let filteredList = activityStatList.filter((activity) => {
            let keep = true;
            Object.values(filters).forEach((filter) => {
                if (!filter.callbackFilter(activity, filter.value)) {
                    keep = false;
                }
            });
            return keep;
        });
        setActivityStatFilteredList(filteredList);
    }, [filters, activityStatList]);

    React.useEffect(() => {
        if (isLoading) {
            return;
        }
        let chartData = [];
        let group2KeyToLabelMap = {};
        if (groupBy.callbackGroupBy) {
            let groupKeyMap = {};
            let groupLabelMap = {};
            let group2LabelMap = {};
            activityStatFilteredList.forEach((activity) => {
                const groupList = groupBy.callbackGroupBy(activity);
                groupList.forEach((group) => {
                    if (groupKeyMap[group.groupKey] === undefined) {
                        let groupLabel = group.groupLabel;
                        let groupLabelIndex = 2;
                        while (groupLabelMap[groupLabel] !== undefined) {
                            groupLabel = group.groupLabel + ' (' + groupLabelIndex + ')';
                            groupLabelIndex++;
                        }
                        groupLabelMap[groupLabel] = true;
                        if (chartTemplate.isStack) {
                            groupKeyMap[group.groupKey] = {
                                groupKey: group.groupKey,
                                groupLabel: groupLabel,
                                group2: {},
                            }
                        } else {
                            groupKeyMap[group.groupKey] = {
                                groupKey: group.groupKey,
                                groupLabel: groupLabel,
                                count: 0,
                            }
                        }
                    }
                    if (chartTemplate.isStack) {
                        let group2List = groupBy2.callbackGroupBy(activity);
                        group2List.forEach((group2) => {
                            if (groupKeyMap[group.groupKey]['group2'][group2.groupKey] === undefined) {
                                let group2Label = group2.groupLabel;
                                let groupLabelIndex = 2;
                                if (group2LabelMap[group.groupKey] === undefined) {
                                    group2LabelMap[group.groupKey] = {};
                                }
                                while (group2LabelMap[group.groupKey][group2Label] !== undefined) {
                                    group2Label = group2.groupLabel + ' (' + groupLabelIndex + ')';
                                    groupLabelIndex++;
                                }
                                group2LabelMap[group.groupKey][group2Label] = true;
                                group2KeyToLabelMap[group2.groupKey] = group2Label;
                                groupKeyMap[group.groupKey]['group2'][group2.groupKey] = 0;
                            }
                            groupKeyMap[group.groupKey]['group2'][group2.groupKey]++;
                        })
                    } else {
                        groupKeyMap[group.groupKey].count++;
                    }
                })
            });

            if (chartTemplate.isStack) {
                chartData = Object.keys(groupKeyMap).map((groupKey) => {
                    let group2Bars = {};
                    let group2 = Object.keys(groupKeyMap[groupKey]['group2']).map((group2Key) => {
                        group2Bars[group2KeyToLabelMap[group2Key]] = groupKeyMap[groupKey]['group2'][group2Key];
                        return {
                            [group2KeyToLabelMap[group2Key]]: groupKeyMap[groupKey]['group2'][group2Key],
                            key: group2Key,
                            name: group2KeyToLabelMap[group2Key],
                            count: groupKeyMap[groupKey]['group2'][group2Key],
                        }
                    });
                    return {
                        key: groupKeyMap[groupKey].groupKey,
                        name: groupKeyMap[groupKey].groupLabel,
                        group2: group2,
                        ...group2Bars,
                    }
                });
            } else {
                chartData = Object.keys(groupKeyMap).map((groupKey) => {
                    return {
                        key: groupKeyMap[groupKey].groupKey,
                        name: groupKeyMap[groupKey].groupLabel,
                        count: groupKeyMap[groupKey].count,
                    }
                });
            }
        }

        setChartOptions(prevState => ({
            ...prevState,
            data: chartData,
            group2KeyToLabelMap: chartTemplate?.isStack ? group2KeyToLabelMap : undefined,
            dataNameMap: chartData.reduce((map, obj) => {
                map[obj.name] = obj;
                return map;
            }, {}),
        }))
    }, [groupBy, activityStatFilteredList, chartTemplate.isStack, groupBy2, isLoading]);

    const renderBarCustomizedLabel = (props) => {
        const { x, y, width, height } = props;
        const entry = chartOptions.dataNameMap[props.name];
        const percentage = (entry.count / activityStatFilteredList.length * 100).toFixed(0);
        const { backgroundColor, color } = getRandomBackgroundColor(entry.key);
        const radius = 10;
        return (
            <g>
                {chartOptions.showCountLabel &&
                    <>
                        <ellipse cx={x + width / 2} cy={y - radius} rx={radius * 2} ry={radius} fill={backgroundColor} />
                        <text x={x + width / 2} y={y - radius} fill={color} textAnchor="middle" dominantBaseline="middle">
                            {entry.count}
                        </text>
                    </>
                }

                {chartOptions.showPercentageLabel && percentage > 0 &&
                    <text x={x + width / 2} y={y + height / 2} fill={color} textAnchor="middle"
                        dominantBaseline="middle">
                        {`${percentage}%`}
                    </text>
                }
            </g>
        );
    };

    const RADIAN = Math.PI / 180;
    const renderPieCustomizedLabel = (entry) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, percent } = entry;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        const percentage = (percent * 100).toFixed(0);
        const { color } = getRandomBackgroundColor(entry.key);
        return (
            <>
                {chartOptions.showPercentageLabel && percentage > 0 &&
                    <text x={x} y={y} fill={color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                        {`${percentage}%`}
                    </text>
                }
                <text x={entry.x}
                    y={entry.y}
                    textAnchor={entry.textAnchor}
                    fill={"#000000"}
                    stroke={entry.fill}
                    strokeWidth={2}
                    paintOrder="stroke"
                >
                    {entry.name}
                    {chartOptions.showCountLabel && ` (${entry.count})`}
                </text>
            </>
        );
    };

    const renderFunnelCustomizedLabel = (props) => {
        const { x, y, width, height } = props;
        const entry = chartOptions.dataNameMap[props.name];
        const percentage = (entry.count / activityStatFilteredList.length * 100).toFixed(0);
        return (
            <text x={x + width / 2} y={y + height / 2} fill={"#000"} textAnchor="middle"
                dominantBaseline="middle">
                {entry.name}
                {chartOptions.showCountLabel && ` (#${entry.count})`}
                {chartOptions.showPercentageLabel && ` (${percentage}%)`}
            </text>
        );
    };

    const barStackLegendFormatter = (value, entry, _index) => {
        const { backgroundColor, color } = getRandomBackgroundColor(entry.payload.groupkey);
        return <span style={{
            color: color,
            backgroundColor: backgroundColor,
        }}>{value}</span>;
    };

    return (
        <div>
            <h1 style={{ fontSize: 24, marginBottom: 20 }}>Des statistiques sur les {activityStatEntry.label} </h1>

            <div>
                {isLoading && <div><Oval className="ml-2" stroke={"black"} /> Loading...</div>}
            </div>

            <div>
                <div>Total count: {activityStatList?.length}</div>
                <div>Total Filtered count: {activityStatFilteredList?.length}</div>

                <div className={"card"} hidden={activityStatEntry?.filters?.length <= 0}>
                    <div className={"card-header alert-primary"}>
                        <h3 className={"card-header-title"}>Filtres</h3>
                    </div>
                    <div className={"card-content"}>
                        {activityStatEntry.filters.map((filter) => {
                            if (filter.inputType === 'select') {
                                return (
                                    <div key={filter.key}>
                                        <label className={"label"}>{filter.label}</label>
                                        <SelectFilterDisplay
                                            key={filter.key}
                                            selectOptions={filter.selectOptions()}
                                            onChange={(selectedOptionsValues) => handleSelectLocalFilterChange(filter, selectedOptionsValues)}
                                        />
                                    </div>
                                )
                            } else return (
                                <div key={filter.key}>
                                    <label className={"label"}>{filter.label}</label>
                                    <input
                                        type={filter.inputType}
                                        defaultValue={filter.initialValueCallback ? filter.initialValueCallback(activityStatList) : ''}
                                        onChange={(event) => handleLocalFilterChange(filter, event.target.value)}
                                    />
                                </div>
                            )
                        })}
                        <br />
                    </div>
                    <div className={"card-apply-filters-action"}>
                        <button className={"btn btn-primary"} onClick={() => handleApplyFilters()}>Apply Filters</button>
                    </div>
                </div>

                <div className={"card"}>
                    <div className={"card-header alert-primary"}>
                        <h3 className={"card-header-title"}>Chart options</h3>
                    </div>
                    <div className={"card-content"}>
                        <div>
                            <label className={"label"}>Chart type</label>
                            <div style={{ display: 'flex' }}>
                                {chartTemplateList.map((chart) => (
                                    <div key={chart.key}>
                                        <Form.Check
                                            type={"radio"}
                                            defaultChecked={chart.checked}
                                            name={"chartType"}
                                            id={chart.key}
                                            label={chart.label}
                                            onChange={() => setChartTemplate(chart)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className={"label"}>Chart size (pixels)</label>
                            <div style={{ display: 'flex' }}>
                                <label className={"label"}>Width</label>
                                <input
                                    type={"number"}
                                    value={chartOptions.chartWidth}
                                    name={"chartWidth"}
                                    onChange={handleChartOptionChange}
                                />
                                <label className={"label"}>Height</label>
                                <input
                                    type={"number"}
                                    value={chartOptions.chartHeight}
                                    name={"chartHeight"}
                                    onChange={handleChartOptionChange}
                                />
                            </div>
                        </div>

                        <div hidden={!['bar', 'pie', 'funnel'].includes(chartTemplate.key)}>
                            <label className={"label"}>Chart Labels</label>
                            <div style={{ display: 'flex' }}>
                                <label className={"label"}>Count</label>
                                <input
                                    type={"checkbox"}
                                    checked={chartOptions.showCountLabel}
                                    name={"showCountLabel"}
                                    onChange={handleChartOptionChange}
                                />
                                <label className={"label"}>Percentage</label>
                                <input
                                    type={"checkbox"}
                                    checked={chartOptions.showPercentageLabel}
                                    name={"showPercentageLabel"}
                                    onChange={handleChartOptionChange}
                                />
                            </div>
                        </div>

                        <label className={"label"}>Activités regroupées par </label>
                        <div style={{ display: 'flex' }}>
                            {groupByList.map((group) => (
                                <div key={group.key} className={"ml-2"}>
                                    <Form.Check
                                        type={"radio"}
                                        name={"groupBy"}
                                        id={group.key}
                                        label={group.label}
                                        defaultChecked={group.checked}
                                        onChange={() => setGroupBy(group)}
                                    />
                                </div>
                            ))}
                        </div>
                        {chartTemplate?.isStack && (
                            <>
                                <label className={"label"}>Stacked par</label>
                                <div style={{ display: 'flex' }}>
                                    {groupByList.map((group) => (
                                        <div key={group.key} className={"ml-2"}>
                                            <Form.Check
                                                type={"radio"}
                                                name={"groupBy2"}
                                                id={`${group.key}-2`}
                                                label={group.label}
                                                defaultChecked={group.checked}
                                                onChange={() => setGroupBy2(group)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        <br />
                    </div>
                </div>

                <br />

                <div
                    style={{
                        width: chartOptions.chartWidth + "px",
                        height: chartOptions.chartHeight + "px",
                    }}
                >
                    {chartTemplate.key === 'bar' ?
                        <div
                            ref={barChartWrapperRef}
                            style={{ width: "100%", height: "100%" }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={chartOptions.data}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="name"
                                        label={{
                                            value: groupBy.key === "none" ? "" : groupBy.label,
                                            position: "insideBottomRight",
                                            offset: 0,
                                        }}
                                    />
                                    <YAxis>
                                        <Label
                                            angle={270}
                                            position="left"
                                            style={{ textAnchor: "middle" }}
                                        >
                                            {"Nombre de " + activityStatEntry.label}
                                        </Label>
                                    </YAxis>
                                    <Tooltip />
                                    <Bar dataKey="count" stackId="a" fill="#8884d8">
                                        {chartOptions.data.map((entry) => (
                                            <Cell
                                                key={entry.key}
                                                fill={getRandomBackgroundColor(entry.key).backgroundColor}
                                            />
                                        ))}
                                        <LabelList dataKey="name" content={renderBarCustomizedLabel} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        : null
                    }

                    {chartTemplate.key === 'barStack' ?
                        <div
                            ref={barStackWrapperRef}
                            style={{ width: "100%", height: "100%" }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={chartOptions.data}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="name"
                                        label={{ value: groupBy.key === 'none' ? "" : groupBy.label, position: 'insideBottomRight', offset: 0 }}
                                    />
                                    <YAxis>
                                        <Label angle={270} position='left' style={{ textAnchor: 'middle' }}>
                                            {"Nombre de " + activityStatEntry.label}
                                        </Label>
                                    </YAxis>
                                    <Tooltip />

                                    {chartOptions.group2KeyToLabelMap && (Object.keys(chartOptions.group2KeyToLabelMap).map((group2Key) => (
                                        <Bar
                                            key={group2Key}
                                            dataKey={chartOptions.group2KeyToLabelMap[group2Key]}
                                            groupkey={group2Key}
                                            fill={getRandomBackgroundColor(group2Key).backgroundColor}
                                        />
                                    )))}
                                    <Legend formatter={barStackLegendFormatter} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        : null
                    }

                    {chartTemplate.key === 'pie' ?
                        <div
                            ref={pieChartWrapperRef}
                            style={{ width: "100%", height: "100%" }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartOptions.data}
                                        dataKey="count"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label={renderPieCustomizedLabel}
                                        fill="#8884d8"
                                    >
                                        {chartOptions.data.map((entry) => (
                                            <Cell
                                                key={entry.key}
                                                fill={getRandomBackgroundColor(entry.key).backgroundColor}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        : null
                    }

                    {/* {chartTemplate.key === 'radar' ?
                        <div
                            ref={radarChartWrapperRef}
                            style={{ width: "100%", height: "100%" }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart
                                    outerRadius={90}
                                    data={chartOptions.data}
                                >
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="name" />
                                    <PolarRadiusAxis />
                                    <Radar
                                        name="count"
                                        dataKey="count"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        fillOpacity={0.6}
                                    />
                                    <Tooltip />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                        : null
                    } */}

                    {chartTemplate.key === 'line' ?
                        <div
                            ref={lineChartWrapperRef}
                            style={{ width: "100%", height: "100%" }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={chartOptions.data}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="name"
                                        label={{ value: groupBy.key === 'none' ? "" : groupBy.label, position: 'insideBottomRight', offset: 0 }}
                                    />
                                    <YAxis>
                                        <Label angle={270} position='left' style={{ textAnchor: 'middle' }}>
                                            {"Nombre de " + activityStatEntry.label}
                                        </Label>
                                    </YAxis>
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#8884d8"
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        : null
                    }

                    {chartTemplate.key === 'area' ?
                        <div
                            ref={areaChartWrapperRef}
                            style={{ width: "100%", height: "100%" }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={chartOptions.data}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="name"
                                        label={{ value: groupBy.key === 'none' ? "" : groupBy.label, position: 'insideBottomRight', offset: 0 }}
                                    />
                                    <YAxis>
                                        <Label angle={270} position='left' style={{ textAnchor: 'middle' }}>
                                            {"Nombre de " + activityStatEntry.label}
                                        </Label>
                                    </YAxis>
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        : null
                    }

                    {chartTemplate.key === 'treemap' ?
                    <div
                            ref={treemapChartWrapperRef}
                            style={{ width: "100%", height: "100%" }}
                        >
                        <ResponsiveContainer>
                            <Treemap
                                width={chartOptions.chartWidth}
                                height={chartOptions.chartHeight}
                                data={chartOptions.data}
                                dataKey="count"
                                ratio={4 / 3}
                                stroke="#fff"
                            >
                                {chartOptions.data.map((entry) => (
                                    <Cell
                                        key={entry.key}
                                        fill={getRandomBackgroundColor(entry.key).backgroundColor}
                                    />
                                ))}
                                <Tooltip />
                            </Treemap>
                        </ResponsiveContainer>
                        </div>
                        : null
                    }

                    {chartTemplate.key === 'funnel' ?
                        <div
                            ref={funnelChartWrapperRef}
                            style={{ width: "100%", height: "100%" }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <FunnelChart>
                                    <Tooltip />
                                    <Funnel
                                        dataKey="count"
                                        data={chartOptions.data}
                                        isAnimationActive={true}
                                    >
                                        {chartOptions.data.map((entry) => (
                                            <Cell
                                                key={entry.key}
                                                fill={getRandomBackgroundColor(entry.key).backgroundColor}
                                            />
                                        ))}
                                        <LabelList
                                            dataKey="name"
                                            position="inside"
                                            content={renderFunnelCustomizedLabel}
                                        />
                                    </Funnel>
                                </FunnelChart>
                            </ResponsiveContainer>
                        </div>
                        : null
                    }
                </div>

                <div className={"title"}>
                    <h1 style={{ fontSize: 24, marginBottom: 20 }}>
                        {chartTemplate?.label} des {activityStatEntry.label}
                        {groupBy.key !== 'none' && " regroupées par " + groupBy.label}
                        <br />
                        {renderDownloadButton(chartTemplate.key)}
                    </h1>
                </div>
            </div>
            <br />
            <br />
            <br />
        </div>
    );
}
