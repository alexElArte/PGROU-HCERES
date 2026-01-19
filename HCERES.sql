--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

-- Started on 2022-04-01 14:49:44

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- TOC entry 200 (class 1259 OID 24663)
-- Name: activity; Type: TABLE; Schema: public; 
--

CREATE TABLE public.activity (
    id_activity integer NOT NULL,
    id_type_activity integer NOT NULL
);


--
-- TOC entry 274 (class 1259 OID 24981)
-- Name: seq_activity; Type: SEQUENCE; Schema: public;
--

CREATE SEQUENCE public.seq_activity
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;

--
-- TOC entry 3890 (class 0 OID 0)
-- Dependencies: 274
-- Name: seq_activity; Type: SEQUENCE OWNED BY; Schema: public;
--

ALTER SEQUENCE public.seq_activity OWNED BY public.activity.id_activity;
--
-- TOC entry 3311 (class 2604 OID 25126)
-- Name: activity id_activity; Type: DEFAULT; Schema: public;
--

ALTER TABLE ONLY public.activity ALTER COLUMN id_activity SET DEFAULT nextval('public.seq_activity'::regclass);


--
-- TOC entry 3365 (class 2606 OID 25172)
-- Name: activity pk_activity; Type: CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY public.activity
    ADD CONSTRAINT pk_activity PRIMARY KEY (id_activity);

--
-- TOC entry 201 (class 1259 OID 24666)
-- Name: activity_researcher; Type: TABLE; Schema: public; 
--

CREATE TABLE public.activity_researcher (
    researcher_id integer NOT NULL,
    id_activity integer NOT NULL
);

--
-- TOC entry 203 (class 1259 OID 24672)
-- Name: admin; Type: TABLE; Schema: public; 
--

CREATE TABLE public.admin (
    researcher_id integer NOT NULL
);


--
-- TOC entry 204 (class 1259 OID 24675)
-- Name: belongs_team; Type: TABLE; Schema: public; 
--

CREATE TABLE public.belongs_team (
    id_belongs_team integer NOT NULL,
    researcher_id integer NOT NULL,
    team_id integer NOT NULL,
    onboarding_date date,
    leaving_date date
);


--
-- TOC entry 205 (class 1259 OID 24678)
-- Name: belongs_team_id_belongs_team_seq; Type: SEQUENCE; Schema: public; Owner: prweb
--

CREATE SEQUENCE public.belongs_team_id_belongs_team_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 206 (class 1259 OID 24680)
-- Name: book; Type: TABLE; Schema: public; 
--

CREATE TABLE public.book (
    id_activity integer NOT NULL,
    publication_date date,
    title character varying(2048),
    editor character varying(2048),
    nb_page integer,
    authors text NOT NULL,
    language_id integer NOT NULL
);


--
-- TOC entry 207 (class 1259 OID 24686)
-- Name: book_chapter; Type: TABLE; Schema: public; 
--

CREATE TABLE public.book_chapter (
    id_activity integer NOT NULL,
    publication_date date,
    book_title character varying(2048),
    chapter_title character varying(2048),
    editor character varying(2048),
    nb_page integer,
    authors text NOT NULL,
    additional_info text,
    language_id integer NOT NULL
);


--
-- TOC entry 208 (class 1259 OID 24692)
-- Name: choice_public_outreach_id_type_seq; Type: SEQUENCE; Schema: public; Owner: prweb
--

CREATE SEQUENCE public.choice_public_outreach_id_type_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 209 (class 1259 OID 24694)
-- Name: choice_type_collab_id_type_seq; Type: SEQUENCE; Schema: public; Owner: prweb
--

CREATE SEQUENCE public.choice_type_collab_id_type_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 210 (class 1259 OID 24696)
-- Name: company; Type: TABLE; Schema: public; 
--

CREATE TABLE public.company (
    company_id integer NOT NULL,
    company_name character varying(2048) NOT NULL
);


--
-- TOC entry 211 (class 1259 OID 24699)
-- Name: company_creation; Type: TABLE; Schema: public; 
--

CREATE TABLE public.company_creation (
    id_activity integer NOT NULL,
    company_creation_name character varying(2048),
    company_creation_date date,
    company_creation_active bool DEFAULT true NOT NULL
);


--
-- TOC entry 212 (class 1259 OID 24703)
-- Name: connection; Type: TABLE; Schema: public; 
--

CREATE TABLE public.connection (
    connection_code character varying(255) NOT NULL,
    connection_login character varying(255) NOT NULL,
    connection_expire timestamp without time zone NOT NULL,
    researcher_id integer,
    connection_status integer DEFAULT 0
);


--
-- TOC entry 213 (class 1259 OID 24710)
-- Name: contract; Type: TABLE; Schema: public; 
--

CREATE TABLE public.contract (
    id_contract integer NOT NULL,
    researcher_id integer NOT NULL,
    id_employer integer NOT NULL,
    id_contract_type integer NOT NULL,
    id_status integer NOT NULL,
    start_contract date,
    end_contract date,
    function_contract character varying(2048)
);


--
-- TOC entry 214 (class 1259 OID 24713)
-- Name: contract_type; Type: TABLE; Schema: public; 
--

CREATE TABLE public.contract_type (
    id_contract_type integer NOT NULL,
    name_contract_type character varying(2048) NOT NULL
);


--
-- TOC entry 215 (class 1259 OID 24716)
-- Name: editorial_activity; Type: TABLE; Schema: public; 
--

CREATE TABLE public.editorial_activity (
    id_activity integer NOT NULL,
    journal_id integer NOT NULL,
    start_date date,
    end_date date,
    impact_factor numeric NOT NULL,
    function_editorial_activity_id integer NOT NULL
);


--
-- TOC entry 216 (class 1259 OID 24722)
-- Name: education; Type: TABLE; Schema: public; 
--

CREATE TABLE public.education (
    id_activity integer NOT NULL,
    education_course_name character varying(2048),
    education_completion date,
    education_description text,
    education_level_id integer NOT NULL,
    education_formation character varying(2048),
    education_involvement_id integer NOT NULL
);


CREATE SEQUENCE public.type_educational_output_id_type_seq_1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.type_educational_output
(
    id_type     integer NOT NULL DEFAULT nextval('public.type_educational_output_id_type_seq_1'::regclass) PRIMARY KEY,
    name_choice character varying
);

CREATE TABLE public.educational_output
(
    id_activity     integer NOT NULL PRIMARY KEY REFERENCES public.activity,
    id_type         integer REFERENCES public.type_educational_output,
    completion_date date,
    description     character varying
);

INSERT INTO public.type_educational_output (id_type, name_choice)
VALUES (1, 'Books');
INSERT INTO public.type_educational_output (id_type, name_choice)
VALUES (2, 'E-learning, MOOCS, multimedia courses, scientific workshops, etc.');
SELECT pg_catalog.setval('public.type_educational_output_id_type_seq_1', 2, true);



CREATE SEQUENCE public.type_involvement_in_training_id_type_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.type_involvement_in_training
(
    id_type     integer NOT NULL DEFAULT nextval('public.type_involvement_in_training_id_type_seq'::regclass) PRIMARY KEY,
    name_choice character varying
);

CREATE TABLE public.involvement_training_pedagogical_responsibility
(
    id_activity integer NOT NULL PRIMARY KEY REFERENCES public.activity,
    year        integer,
    name_master character varying,
    id_type     integer REFERENCES public.type_involvement_in_training
);

INSERT INTO public.type_involvement_in_training (id_type, name_choice)
VALUES (1, 'Pedagogical responsibility for a masters degree or course');
INSERT INTO public.type_involvement_in_training (id_type, name_choice)
VALUES (2,
        'Pedagogical responsibility for a masters degree or course with international accreditation (e. g. erasmus mundus)');
SELECT pg_catalog.setval('public.type_involvement_in_training_id_type_seq', 2, true);

--
-- TOC entry 217 (class 1259 OID 24728)
-- Name: education_involvement; Type: TABLE; Schema: public;
--

CREATE TABLE public.education_involvement (
    education_involvement_id integer NOT NULL,
    education_involvement_name character varying(2048) NOT NULL
);


--
-- TOC entry 218 (class 1259 OID 24731)
-- Name: education_level; Type: TABLE; Schema: public; 
--

CREATE TABLE public.education_level (
    education_level_id integer NOT NULL,
    education_level_name character varying(64) NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 24734)
-- Name: employer; Type: TABLE; Schema: public; 
--

CREATE TABLE public.employer (
    id_employer integer NOT NULL,
    name_employer character varying(2048)
);


--
-- TOC entry 220 (class 1259 OID 24737)
-- Name: employer_id_employer_seq; Type: SEQUENCE; Schema: public; Owner: prweb
--

CREATE SEQUENCE public.employer_id_employer_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 221 (class 1259 OID 24739)
-- Name: evaluation_thesis; Type: TABLE; Schema: public; 
--

CREATE TABLE public.evaluation_thesis (
    id_activity integer NOT NULL,
    type_thesis_id integer NOT NULL,
    evaluation_thesis_role_id integer NOT NULL,
    year integer,
    name_university character varying(2048)
);


--
-- TOC entry 222 (class 1259 OID 24742)
-- Name: evaluation_thesis_role; Type: TABLE; Schema: public; 
--

CREATE TABLE public.evaluation_thesis_role (
    evaluation_thesis_role_id integer NOT NULL,
    evaluation_thesis_role_name character varying(2048)
);


--
-- TOC entry 223 (class 1259 OID 24745)
-- Name: evaluation_thesis_role_evaluation_thesis_role_id_seq; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.evaluation_thesis_role_evaluation_thesis_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



--
-- TOC entry 3888 (class 0 OID 0)
-- Dependencies: 223
-- Name: evaluation_thesis_role_evaluation_thesis_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.evaluation_thesis_role_evaluation_thesis_role_id_seq OWNED BY public.evaluation_thesis_role.evaluation_thesis_role_id;


--
-- TOC entry 224 (class 1259 OID 24747)
-- Name: function_editorial_activity; Type: TABLE; Schema: public; 
--

CREATE TABLE public.function_editorial_activity (
    function_editorial_activity_id integer NOT NULL,
    function_editorial_activity_name character varying(2048)
);


--
-- TOC entry 283 (class 1259 OID 24999)
-- Name: seq_function_editorial_activity; Type: SEQUENCE; Schema: public;
--

CREATE SEQUENCE public.seq_function_editorial_activity
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3899 (class 0 OID 0)
-- Dependencies: 283
-- Name: seq_function_editorial_activity; Type: SEQUENCE OWNED BY; Schema: public;
--

ALTER SEQUENCE public.seq_function_editorial_activity OWNED BY public.function_editorial_activity.function_editorial_activity_id;


INSERT INTO public.function_editorial_activity (function_editorial_activity_id, function_editorial_activity_name)
VALUES (1, 'Editor in chief');
INSERT INTO public.function_editorial_activity (function_editorial_activity_id, function_editorial_activity_name)
VALUES (2, 'Associate editor');
INSERT INTO public.function_editorial_activity (function_editorial_activity_id, function_editorial_activity_name)
VALUES (3, 'Review editor');
INSERT INTO public.function_editorial_activity (function_editorial_activity_id, function_editorial_activity_name)
VALUES (4, 'Board member');
INSERT INTO public.function_editorial_activity (function_editorial_activity_id, function_editorial_activity_name)
VALUES (5, 'Other');
SELECT pg_catalog.setval('public.seq_function_editorial_activity', 5, true);

--
-- TOC entry 225 (class 1259 OID 24750)
-- Name: funder; Type: TABLE; Schema: public; 
--

CREATE TABLE public.funder (
    funder_id character varying NOT NULL,
    funder_name character varying(2048) NOT NULL
);


--
-- TOC entry 226 (class 1259 OID 24756)
-- Name: incoming_mobility; Type: TABLE; Schema: public; 
--

CREATE TABLE public.incoming_mobility (
    id_activity integer NOT NULL,
    name_senior_scientist character varying(2048),
    arrival_date date,
    departure_date date,
    duration integer,
    nationality character varying(2048),
    original_lab_name character varying(2048),
    origina_lab_location character varying(2048),
    pi_partner character varying(2048),
    project_title character varying(2048),
    associated_funding character varying(2048),
    publication_reference character varying(2048),
    strategic_recurring_collab bool,
    active_project bool,
    umr_coordinated bool,
    agreement_signed bool
);


--
-- TOC entry 227 (class 1259 OID 24762)
-- Name: institution; Type: TABLE; Schema: public; 
--

CREATE TABLE public.institution (
    institution_id integer NOT NULL,
    institution_name character varying(2048) NOT NULL
);


--
-- TOC entry 228 (class 1259 OID 24765)
-- Name: institutional_comitee; Type: TABLE; Schema: public; 
--

CREATE TABLE public.institutional_comitee (
    id_activity integer NOT NULL,
    institutional_comitee_name character varying(2048),
    year integer,
    laboratory_evaluation_role_id integer NOT NULL
);


--
-- TOC entry 229 (class 1259 OID 24768)
-- Name: invited_seminar; Type: TABLE; Schema: public; 
--

CREATE TABLE public.invited_seminar (
    id_activity integer NOT NULL,
    title_seminar character varying(2048),
    date date,
    location character varying(2048),
    invited_by character varying(2048)
);


--
-- TOC entry 230 (class 1259 OID 24774)
-- Name: journal; Type: TABLE; Schema: public; 
--

CREATE TABLE public.journal (
    journal_id integer NOT NULL,
    journal_name character varying(2048) NOT NULL
);


--
-- TOC entry 231 (class 1259 OID 24777)
-- Name: labcom_creation; Type: TABLE; Schema: public; 
--

CREATE TABLE public.labcom_creation (
    id_activity integer NOT NULL,
    labcom_creation_name character varying(2048),
    contract_start_date date,
    name_company_involved character varying(2048),
    title_project character varying(2048),
    contract_end_date date,
    associated_publi_ref character varying(2048)
);


--
-- TOC entry 232 (class 1259 OID 24783)
-- Name: laboratory; Type: TABLE; Schema: public; 
--

CREATE TABLE public.laboratory (
    laboratory_id integer NOT NULL,
    laboratory_name character varying(2048) NOT NULL,
    laboratory_acronym character varying(32),
    institution_id integer NOT NULL
);


--
-- TOC entry 233 (class 1259 OID 24786)
-- Name: laboratory_evaluation; Type: TABLE; Schema: public; 
--

CREATE TABLE public.laboratory_evaluation (
    id_activity integer NOT NULL,
    laboratory_evaluation_name character varying(2048),
    year integer,
    laboratory_evaluation_role_id integer NOT NULL
);


--
-- TOC entry 234 (class 1259 OID 24789)
-- Name: laboratory_evaluation_role; Type: TABLE; Schema: public; 
--

CREATE TABLE public.laboratory_evaluation_role (
    laboratory_evaluation_role_id integer NOT NULL,
    name_choice character varying(2048)
);


--
-- TOC entry 288 (class 1259 OID 25009)
-- Name: seq_laboratory_evaluation_role; Type: SEQUENCE; Schema: public;
--

CREATE SEQUENCE public.seq_laboratory_evaluation_role
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3904 (class 0 OID 0)
-- Dependencies: 288
-- Name: seq_laboratory_evaluation_role; Type: SEQUENCE OWNED BY; Schema: public;
--

ALTER SEQUENCE public.seq_laboratory_evaluation_role OWNED BY public.laboratory_evaluation_role.laboratory_evaluation_role_id;


--  ask doctor for initial value
insert into public.laboratory_evaluation_role (laboratory_evaluation_role_id, name_choice) values (1, 'Chair');
insert into public.laboratory_evaluation_role (laboratory_evaluation_role_id, name_choice) values (2, 'Member');
insert into public.laboratory_evaluation_role (laboratory_evaluation_role_id, name_choice) values (3, 'Other');
insert into public.laboratory_evaluation_role (laboratory_evaluation_role_id, name_choice) values (4, 'Chair and Member');
insert into public.laboratory_evaluation_role (laboratory_evaluation_role_id, name_choice) values (5, 'Chair and Other');
insert into public.laboratory_evaluation_role (laboratory_evaluation_role_id, name_choice) values (6, 'Member and Other');
select pg_catalog.setval('public.seq_laboratory_evaluation_role', 6, true);


--
-- TOC entry 235 (class 1259 OID 24792)
-- Name: language; Type: TABLE; Schema: public; 
--

CREATE TABLE public.language (
    language_id integer NOT NULL,
    language_name character varying(2048) NOT NULL
);

create unique index language_language_name_uindex
    on public.language (language_name);


--
-- TOC entry 236 (class 1259 OID 24795)
-- Name: learned_scientific_society; Type: TABLE; Schema: public; 
--

CREATE TABLE public.learned_scientific_society (
    id_activity integer NOT NULL,
    learned_scientific_society_role_id integer NOT NULL,
    learned_scientific_society_name character varying(2048),
    start_date date,
    end_date date
);


--
-- TOC entry 237 (class 1259 OID 24798)
-- Name: learned_scientific_society_role; Type: TABLE; Schema: public; 
--

CREATE TABLE public.learned_scientific_society_role (
    learned_scientific_society_role_id integer NOT NULL,
    name_choice character varying(2048)
);

--
-- TOC entry 290 (class 1259 OID 25013)
-- Name: seq_learned_scientific_society_role; Type: SEQUENCE; Schema: public;
--

CREATE SEQUENCE public.seq_learned_scientific_society_role
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3906 (class 0 OID 0)
-- Dependencies: 290
-- Name: seq_learned_scientific_society_role; Type: SEQUENCE OWNED BY; Schema: public;
--

ALTER SEQUENCE public.seq_learned_scientific_society_role OWNED BY public.learned_scientific_society_role.learned_scientific_society_role_id;


INSERT INTO public.learned_scientific_society_role (learned_scientific_society_role_id, name_choice) VALUES (1, 'President');
INSERT INTO public.learned_scientific_society_role (learned_scientific_society_role_id, name_choice) VALUES (2, 'Vice president');
INSERT INTO public.learned_scientific_society_role (learned_scientific_society_role_id, name_choice) VALUES (3, 'Board member');
INSERT INTO public.learned_scientific_society_role (learned_scientific_society_role_id, name_choice) VALUES (4, 'Other');
SELECT pg_catalog.setval('public.seq_learned_scientific_society_role', 5, true);




--
-- TOC entry 238 (class 1259 OID 24801)
-- Name: mail_activity; Type: TABLE; Schema: public; 
--

CREATE TABLE public.mail_activity (
    mail_activity_id integer NOT NULL,
    id_activity integer NOT NULL,
    mail_template_id integer NOT NULL,
    mail_activity_date date NOT NULL
);


--
-- TOC entry 239 (class 1259 OID 24804)
-- Name: mail_template; Type: TABLE; Schema: public; 
--

CREATE TABLE public.mail_template (
    mail_template_id integer NOT NULL,
    mail_template_title character varying(2048) NOT NULL,
    mail_template_content text NOT NULL
);


--
-- TOC entry 240 (class 1259 OID 24810)
-- Name: meeting; Type: TABLE; Schema: public; 
--

CREATE TABLE public.meeting (
    meeting_id integer NOT NULL,
    neeting_name character varying(2048) NOT NULL,
    meeting_year integer NOT NULL,
    meeting_location character varying(2048) NOT NULL,
    meeting_start date,
    meeting_end date
);


--
-- TOC entry 241 (class 1259 OID 24816)
-- Name: meeting_congress_org; Type: TABLE; Schema: public; 
--

CREATE TABLE public.meeting_congress_org (
    id_activity integer NOT NULL,
    meeting_id integer NOT NULL
);


--
-- TOC entry 242 (class 1259 OID 24819)
-- Name: national_international_collaboration; Type: TABLE; Schema: public; 
--

CREATE TABLE public.national_international_collaboration (
    id_activity integer NOT NULL,
    type_collab_id integer NOT NULL,
    date_project_start date,
    partner_entity character varying(2048),
    country_state_city character varying(2048),
    pi_partners character varying(2048),
    mail_partners character varying(2048),
    projetc_title character varying(2048),
    strategic_recurring_collab bool,
    active_project bool,
    associated_funding character varying(2048),
    number_resulting_publications integer,
    ref_joint_publication character varying(2048),
    umr_coordinated bool,
    agreement_signed bool
);


--
-- TOC entry 243 (class 1259 OID 24825)
-- Name: nationality; Type: TABLE; Schema: public; 
--

CREATE TABLE public.nationality (
    nationality_id integer NOT NULL,
    nationality_name character varying(128) NOT NULL
);


--
-- TOC entry 244 (class 1259 OID 24828)
-- Name: network; Type: TABLE; Schema: public; 
--

CREATE TABLE public.network (
    id_activity integer NOT NULL,
    start_date date,
    name_network character varying(2048),
    active_network bool,
    associated_funding character varying(2048),
    nb_resulting_publications integer,
    ref_resulting_publications character varying(2048),
    umr_coordinated bool,
    agreement_signed bool
);


--
-- TOC entry 245 (class 1259 OID 24834)
-- Name: oral_communication_poster; Type: TABLE; Schema: public;
--

CREATE SEQUENCE public.type_oral_com_poster_id_type_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.type_oral_com_poster
(
    type_oral_com_poster_id integer NOT NULL PRIMARY KEY DEFAULT nextval('public.type_oral_com_poster_id_type_seq'::regclass),
    name_choice character varying
);


INSERT INTO public.type_oral_com_poster (type_oral_com_poster_id, name_choice)
VALUES (1, 'Oral communication');
INSERT INTO public.type_oral_com_poster (type_oral_com_poster_id, name_choice)
VALUES (2, 'Poster');
SELECT pg_catalog.setval('public.type_oral_com_poster_id_type_seq', 2, true);



CREATE TABLE public.oral_communication_poster(
         id_activity integer NOT NULL,
         type_oral_com_poster_id integer NOT NULL,
         oral_communication_title character varying(512),
         oral_communication_date date NOT NULL,
         meeting_id integer NOT NULL,
         authors text NOT NULL
);

ALTER TABLE public.oral_communication_poster
    ADD CONSTRAINT oral_communication_poster_type_oral_com_poster_id_fkey FOREIGN KEY (type_oral_com_poster_id)
    REFERENCES public.type_oral_com_poster (type_oral_com_poster_id);

--
-- TOC entry 246 (class 1259 OID 24840)
-- Name: outgoing_mobility; Type: TABLE; Schema: public; 
--

CREATE TABLE public.outgoing_mobility (
    id_activity integer NOT NULL,
    name_person_concerned character varying(2048),
    arrival_date date,
    departure_date date,
    duration integer,
    host_lab_name character varying(2048),
    host_lab_location character varying(2048),
    pi_partner character varying(2048),
    project_title character varying(2048),
    associated_funding character varying(2048),
    nb_publications integer,
    publication_reference character varying(2048),
    strategic_recurring_collab bool,
    active_project bool,
    umr_coordinated bool,
    agreement_signed bool
);


--
-- TOC entry 247 (class 1259 OID 24846)
-- Name: parameter; Type: TABLE; Schema: public; 
--

CREATE TABLE public.parameter (
    parameter_id integer NOT NULL,
    parameter_name character varying(2048) NOT NULL,
    parameter_value character varying(1024)
);


--
-- TOC entry 248 (class 1259 OID 24852)
-- Name: patent; Type: TABLE; Schema: public; 
--

CREATE TABLE public.patent (
    id_activity integer NOT NULL,
    type_patent_id integer NOT NULL,
    title character varying(2048),
    registration_date date,
    filing_date date,
    acceptation_date date,
    licensing_date date,
    inventors text NOT NULL,
    co_owners text NOT NULL,
    priority_number real,
    priority_date date,
    publication_number character varying(2048),
    publication_date date,
    inpi_link character varying(2048),
    status bool DEFAULT false NOT NULL,
    pct_extension_obtained bool DEFAULT false NOT NULL,
    publication_number_pct_extension character varying(2048),
    publication_date_pct_extension date,
    international_extension bool DEFAULT false NOT NULL,
    publication_number_international_extension character varying(2048),
    publication_date_international_extension date,
    ref_transfer_contract character varying(2048),
    name_company_involved character varying(2048)
);

CREATE TABLE public.training_thesis (
    id_activity integer NOT NULL,
    phd_student_id integer NOT NULL,
    thesis_start date NOT NULL,
    thesis_type_id integer NOT NULL,
    thesis_main_funding character varying(2048),
    thesis_defense_date date,
    thesis_duration integer DEFAULT 0 NOT NULL,
    thesis_futur text,
    thesis_number_articles integer,
    thesis_number_articles_first_second_position integer,
    thesis_articles_first_second_position_references text
);


--
-- TOC entry 249 (class 1259 OID 24861)
-- Name: thesis_associated_company; Type: TABLE; Schema: public; 
--

CREATE TABLE public.thesis_associated_company (
    id_activity integer NOT NULL,
    company_id integer NOT NULL,
    thesis_associated_company_start date,
    thesis_associated_company_end date
);


--
-- TOC entry 250 (class 1259 OID 24864)
-- Name: phd_student; Type: TABLE; Schema: public; 
--

CREATE TABLE public.phd_student (
    phd_student_id integer NOT NULL,
    phd_student_name character varying(2048),
    phd_student_surname character varying(2048),
    nationality_id integer
);



--
-- TOC entry 251 (class 1259 OID 24871)
-- Name: thesis_type; Type: TABLE; Schema: public; 
--

CREATE TABLE public.thesis_type (
    thesis_type_id integer NOT NULL,
    thesis_type_name character varying(2048) NOT NULL
);


--
-- TOC entry 252 (class 1259 OID 24874)
-- Name: platform; Type: TABLE; Schema: public; 
--

CREATE TABLE public.platform (
    id_activity integer NOT NULL,
    creation_date date,
    description character varying(2048),
    managers character varying(2048),
    affiliation character varying(2048),
    labellisation character varying(2048),
    open_private_researchers bool
);


--
-- TOC entry 253 (class 1259 OID 24880)
-- Name: post_doc; Type: TABLE; Schema: public; 
--

CREATE TABLE public.post_doc (
    id_activity integer NOT NULL,
    name_post_doc character varying(2048),
    name_supervisor character varying(2048),
    arrival_date date,
    departure_date date,
    duration integer,
    nationality character varying(2048),
    original_lab character varying(2048),
    associated_funding character varying(2048),
    associated_publi_ref character varying(2048)
);


--
-- TOC entry 254 (class 1259 OID 24886)
-- Name: project_evaluation; Type: TABLE; Schema: public; 
--

CREATE TABLE public.project_evaluation (
    id_activity integer NOT NULL,
    funder_id character varying NOT NULL,
    year integer,
    project_evaluation_role_id integer NOT NULL,
    project_evaluation_category_id integer NOT NULL
);


--
-- TOC entry 255 (class 1259 OID 24892)
-- Name: project_evaluation_category; Type: TABLE; Schema: public; 
--

CREATE TABLE public.project_evaluation_category (
    project_evaluation_category_id integer NOT NULL,
    project_evaluation_category_name character varying(2048)
);


--
-- TOC entry 256 (class 1259 OID 24895)
-- Name: project_evaluation_role; Type: TABLE; Schema: public; 
--

CREATE TABLE public.project_evaluation_role (
    project_evaluation_role_id integer NOT NULL,
    project_evaluation_role_name character varying(2048)
);


--
-- TOC entry 257 (class 1259 OID 24898)
-- Name: public_outreach; Type: TABLE; Schema: public; 
--

CREATE TABLE public.public_outreach (
    id_activity integer NOT NULL,
    public_outreach_type_id integer NOT NULL,
    completion_date date,
    description character varying(2048)
);


--
-- TOC entry 258 (class 1259 OID 24901)
-- Name: public_outreach_type; Type: TABLE; Schema: public; 
--

CREATE TABLE public.public_outreach_type (
    public_outreach_type_id integer NOT NULL,
    public_outreach_type_name character varying(2048)
);

--
-- TOC entry 300 (class 1259 OID 25033)
-- Name: seq_public_outreach_type; Type: SEQUENCE; Schema: public;
--

CREATE SEQUENCE public.seq_public_outreach_type
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- TOC entry 3916 (class 0 OID 0)
-- Dependencies: 300
-- Name: seq_public_outreach_type; Type: SEQUENCE OWNED BY; Schema: public;
--

ALTER SEQUENCE public.seq_public_outreach_type OWNED BY public.public_outreach_type.public_outreach_type_id;


INSERT INTO public.public_outreach_type (public_outreach_type_id, public_outreach_type_name)
VALUES (1, 'Radio broadcasts, TV shows, magazines');
INSERT INTO public.public_outreach_type (public_outreach_type_id, public_outreach_type_name)
VALUES (2,
        'Articles, interviews, book editions, videos, scientific mediation products, science and society debates, etc.');
SELECT pg_catalog.setval('public.seq_public_outreach_type', 2, true);


--
-- TOC entry 259 (class 1259 OID 24904)
-- Name: publication; Type: TABLE; Schema: public; 
--

CREATE TABLE public.publication (
    id_activity integer NOT NULL,
    title character varying(512),
    authors text NOT NULL,
    source character varying(2048),
    publication_date date,
    publication_type_id integer NOT NULL,
    pmid character varying(16),
    impact_factor numeric
);


--
-- TOC entry 260 (class 1259 OID 24910)
-- Name: publication_statistics; Type: TABLE; Schema: public; 
--

CREATE TABLE public.publication_statistics (
    team_id integer NOT NULL,
    publication_statistics_year integer NOT NULL,
    publication_statistics_pdc integer DEFAULT 0 NOT NULL,
    publication_statistics_collab_int integer DEFAULT 0 NOT NULL,
    publication_statistics_collab_labo integer DEFAULT 0 NOT NULL
);


--
-- TOC entry 261 (class 1259 OID 24916)
-- Name: publication_type; Type: TABLE; Schema: public; 
--

CREATE TABLE public.publication_type (
    publication_type_id integer NOT NULL,
    publication_type_name character varying(2048)
);


--
-- TOC entry 262 (class 1259 OID 24919)
-- Name: research_contract_funded_public_charitable_inst; Type: TABLE; Schema: public; 
--

CREATE TABLE public.research_contract_funded_public_charitable_inst (
    id_activity integer NOT NULL,
    id_type integer NOT NULL,
    date_contract_award date,
    funding_institution character varying(2048),
    project_title character varying(2048),
    start_year integer,
    end_year integer,
    grant_amount integer
);


--
-- TOC entry 263 (class 1259 OID 24925)
-- Name: researcher; Type: TABLE; Schema: public; 
--

CREATE TABLE public.researcher (
    researcher_id integer NOT NULL,
    researcher_surname character varying(2048) NOT NULL,
    researcher_name character varying(2048),
    researcher_email character varying(2048),
    researcher_orcid character varying(2048),
    researcher_login character varying(2048),
    researcher_password character varying(1024)
);

ALTER TABLE public.researcher ADD CONSTRAINT unique_researcher_login UNIQUE (researcher_login);


--
-- TOC entry 264 (class 1259 OID 24931)
-- Name: researcher_nationality; Type: TABLE; Schema: public; 
--

CREATE TABLE public.researcher_nationality (
    nationality_id integer NOT NULL,
    researcher_id integer NOT NULL
);


--
-- TOC entry 265 (class 1259 OID 24934)
-- Name: reviewing_journal_articles; Type: TABLE; Schema: public; 
--

CREATE TABLE public.reviewing_journal_articles (
    id_activity integer NOT NULL,
    journal_id integer NOT NULL,
    year integer,
    nb_reviewed_articles integer,
    impact_factor numeric
);


--
-- TOC entry 266 (class 1259 OID 24940)
-- Name: scientific_expertise; Type: TABLE; Schema: public; 
--

CREATE TABLE public.scientific_expertise (
    id_activity integer NOT NULL,
    scientific_expertise_type_id integer NOT NULL,
    start_date date,
    end_date date,
    description text NOT NULL
);


--
-- TOC entry 267 (class 1259 OID 24946)
-- Name: scientific_expertise_type; Type: TABLE; Schema: public; 
--

CREATE TABLE public.scientific_expertise_type (
    scientific_expertise_type_id integer NOT NULL,
    name_choice character varying(2048)
);


--
-- TOC entry 268 (class 1259 OID 24949)
-- Name: scientific_expertise_type_scientific_expertise_type_id_seq; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.scientific_expertise_type_scientific_expertise_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3889 (class 0 OID 0)
-- Dependencies: 268
-- Name: scientific_expertise_type_scientific_expertise_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.scientific_expertise_type_scientific_expertise_type_id_seq OWNED BY public.scientific_expertise_type.scientific_expertise_type_id;



INSERT INTO public.scientific_expertise_type (scientific_expertise_type_id, name_choice) VALUES (1, 'Consulting');
INSERT INTO public.scientific_expertise_type (scientific_expertise_type_id, name_choice) VALUES (2, 'Participation in expert committees (such as ANSES) or standardisation bodies');
INSERT INTO public.scientific_expertise_type (scientific_expertise_type_id, name_choice) VALUES (3, 'Legal expertise');
INSERT INTO public.scientific_expertise_type (scientific_expertise_type_id, name_choice) VALUES (4, 'Coordination of national or international research networks, of a National Reference Centre, etc.');
INSERT INTO public.scientific_expertise_type (scientific_expertise_type_id, name_choice) VALUES (5, 'Expert and standardization reports');
SELECT pg_catalog.setval('public.scientific_expertise_type_scientific_expertise_type_id_seq', 5, true);


--
-- TOC entry 269 (class 1259 OID 24951)
-- Name: sei_cifre_fellowship; Type: TABLE; Schema: public; 
--

CREATE TABLE public.sei_cifre_fellowship (
    id_activity integer NOT NULL,
    contract_start_date date,
    name_fellow character varying(2048),
    name_company_involved character varying(2048),
    title_thesis character varying(2048),
    contract_end_date date,
    contract_amount integer,
    associated_publi_ref character varying(2048)
);


--
-- TOC entry 270 (class 1259 OID 24957)
-- Name: sei_clinical_trial; Type: TABLE; Schema: public; 
--

CREATE TABLE public.sei_clinical_trial (
    id_activity integer NOT NULL,
    start_date date,
    coordinator_partner bool,
    title_clinical_trial character varying(2048),
    end_date date,
    registration_nb character varying(2048),
    sponsor_name character varying(2048),
    included_patients_nb integer,
    funding character varying(2048),
    funding_amount integer
);


--
-- TOC entry 271 (class 1259 OID 24963)
-- Name: sei_industrial_r_d_contract; Type: TABLE; Schema: public; 
--

CREATE TABLE public.sei_industrial_r_d_contract (
    id_activity integer NOT NULL,
    start_date date,
    name_company_involved character varying(2048),
    project_title character varying(2048),
    agreement_amount integer,
    end_date date,
    associated_publi_ref character varying(2048)
);


--
-- TOC entry 272 (class 1259 OID 24969)
-- Name: sei_lead_consortium_industry; Type: TABLE; Schema: public; 
--

CREATE TABLE public.sei_lead_consortium_industry (
    id_activity integer NOT NULL,
    type_consortium_id integer NOT NULL,
    consortium_start_date date,
    name_consortium character varying(2048),
    title_project character varying(2048),
    private_party_involved character varying(2048),
    consortium_end_date date,
    associated_publi_ref character varying(2048)
);


--
-- TOC entry 273 (class 1259 OID 24975)
-- Name: sei_network_unit_creation; Type: TABLE; Schema: public; 
--

CREATE TABLE public.sei_network_unit_creation (
    id_activity integer NOT NULL,
    network_start_date date,
    name_network character varying(2048),
    name_partner character varying(2048),
    title_project character varying(2048),
    network_end_date date,
    associated_publi_ref character varying(2048)
);


--
-- TOC entry 275 (class 1259 OID 24983)
-- Name: seq_belongs_team; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_belongs_team
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;


--
-- TOC entry 3891 (class 0 OID 0)
-- Dependencies: 275
-- Name: seq_belongs_team; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_belongs_team OWNED BY public.belongs_team.id_belongs_team;


--
-- TOC entry 276 (class 1259 OID 24985)
-- Name: seq_choice_publication; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_choice_publication
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3892 (class 0 OID 0)
-- Dependencies: 276
-- Name: seq_choice_publication; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_choice_publication OWNED BY public.publication_type.publication_type_id;


--
-- TOC entry 277 (class 1259 OID 24987)
-- Name: seq_company; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_company
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3893 (class 0 OID 0)
-- Dependencies: 277
-- Name: seq_company; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_company OWNED BY public.company.company_id;


--
-- TOC entry 278 (class 1259 OID 24989)
-- Name: seq_contract; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_contract
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3894 (class 0 OID 0)
-- Dependencies: 278
-- Name: seq_contract; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_contract OWNED BY public.contract.id_contract;


--
-- TOC entry 279 (class 1259 OID 24991)
-- Name: seq_contract_type; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_contract_type
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3895 (class 0 OID 0)
-- Dependencies: 279
-- Name: seq_contract_type; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_contract_type OWNED BY public.contract_type.id_contract_type;


--
-- TOC entry 280 (class 1259 OID 24993)
-- Name: seq_education_involvement; Type: SEQUENCE; Schema: public;
--

CREATE SEQUENCE public.seq_education_involvement
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3896 (class 0 OID 0)
-- Dependencies: 280
-- Name: seq_education_involvement; Type: SEQUENCE OWNED BY; Schema: public;
--

ALTER SEQUENCE public.seq_education_involvement OWNED BY public.education_involvement.education_involvement_id;


--
-- TOC entry 281 (class 1259 OID 24995)
-- Name: seq_education_level; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_education_level
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3897 (class 0 OID 0)
-- Dependencies: 281
-- Name: seq_education_level; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_education_level OWNED BY public.education_level.education_level_id;


--
-- TOC entry 282 (class 1259 OID 24997)
-- Name: seq_employer; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_employer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3898 (class 0 OID 0)
-- Dependencies: 282
-- Name: seq_employer; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_employer OWNED BY public.employer.id_employer;


--
-- TOC entry 284 (class 1259 OID 25001)
-- Name: seq_funder; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_funder
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3900 (class 0 OID 0)
-- Dependencies: 284
-- Name: seq_funder; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_funder OWNED BY public.funder.funder_id;


--
-- TOC entry 285 (class 1259 OID 25003)
-- Name: seq_institution; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_institution
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3901 (class 0 OID 0)
-- Dependencies: 285
-- Name: seq_institution; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_institution OWNED BY public.institution.institution_id;


--
-- TOC entry 286 (class 1259 OID 25005)
-- Name: seq_journal; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_journal
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3902 (class 0 OID 0)
-- Dependencies: 286
-- Name: seq_journal; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_journal OWNED BY public.journal.journal_id;


--
-- TOC entry 287 (class 1259 OID 25007)
-- Name: seq_laboratory; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_laboratory
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3903 (class 0 OID 0)
-- Dependencies: 287
-- Name: seq_laboratory; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_laboratory OWNED BY public.laboratory.laboratory_id;



--
-- TOC entry 289 (class 1259 OID 25011)
-- Name: seq_language; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_language
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3905 (class 0 OID 0)
-- Dependencies: 289
-- Name: seq_language; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_language OWNED BY public.language.language_id;




--
-- TOC entry 291 (class 1259 OID 25015)
-- Name: seq_mail_activity; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_mail_activity
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3907 (class 0 OID 0)
-- Dependencies: 291
-- Name: seq_mail_activity; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_mail_activity OWNED BY public.mail_activity.mail_activity_id;


--
-- TOC entry 292 (class 1259 OID 25017)
-- Name: seq_mail_template; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_mail_template
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3908 (class 0 OID 0)
-- Dependencies: 292
-- Name: seq_mail_template; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_mail_template OWNED BY public.mail_template.mail_template_id;


--
-- TOC entry 293 (class 1259 OID 25019)
-- Name: seq_meeting; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_meeting
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3909 (class 0 OID 0)
-- Dependencies: 293
-- Name: seq_meeting; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_meeting OWNED BY public.meeting.meeting_id;


--
-- TOC entry 294 (class 1259 OID 25021)
-- Name: seq_nationality; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_nationality
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3910 (class 0 OID 0)
-- Dependencies: 294
-- Name: seq_nationality; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_nationality OWNED BY public.nationality.nationality_id;


--
-- TOC entry 295 (class 1259 OID 25023)
-- Name: seq_parameter; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_parameter
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3911 (class 0 OID 0)
-- Dependencies: 295
-- Name: seq_parameter; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_parameter OWNED BY public.parameter.parameter_id;


--
-- TOC entry 296 (class 1259 OID 25025)
-- Name: seq_phd_student; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_phd_student
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3912 (class 0 OID 0)
-- Dependencies: 296
-- Name: seq_phd_student; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_phd_student OWNED BY public.phd_student.phd_student_id;


--
-- TOC entry 297 (class 1259 OID 25027)
-- Name: seq_thesis_type; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_thesis_type
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3913 (class 0 OID 0)
-- Dependencies: 297
-- Name: seq_thesis_type; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_thesis_type OWNED BY public.thesis_type.thesis_type_id;


--
-- TOC entry 298 (class 1259 OID 25029)
-- Name: seq_project_evaluation_category; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_project_evaluation_category
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3914 (class 0 OID 0)
-- Dependencies: 298
-- Name: seq_project_evaluation_category; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_project_evaluation_category OWNED BY public.project_evaluation_category.project_evaluation_category_id;


--
-- TOC entry 299 (class 1259 OID 25031)
-- Name: seq_project_evaluation_role; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_project_evaluation_role
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3915 (class 0 OID 0)
-- Dependencies: 299
-- Name: seq_project_evaluation_role; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_project_evaluation_role OWNED BY public.project_evaluation_role.project_evaluation_role_id;


--
-- TOC entry 301 (class 1259 OID 25035)
-- Name: seq_researcher; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_researcher
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;


--
-- TOC entry 3917 (class 0 OID 0)
-- Dependencies: 301
-- Name: seq_researcher; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_researcher OWNED BY public.researcher.researcher_id;


--
-- TOC entry 302 (class 1259 OID 25037)
-- Name: status; Type: TABLE; Schema: public; 
--

CREATE TABLE public.status (
    id_status integer NOT NULL,
    name_status character varying(2048) NOT NULL
);


--
-- TOC entry 303 (class 1259 OID 25040)
-- Name: seq_status; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_status
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3918 (class 0 OID 0)
-- Dependencies: 303
-- Name: seq_status; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_status OWNED BY public.status.id_status;


--
-- TOC entry 304 (class 1259 OID 25042)
-- Name: supervisor; Type: TABLE; Schema: public; 
--

CREATE TABLE public.supervisor (
    supervisor_id integer NOT NULL,
    researcher_id integer NOT NULL,
    phd_student_id integer NOT NULL,
    supervisor_percentage numeric DEFAULT 100
);


--
-- TOC entry 305 (class 1259 OID 25049)
-- Name: seq_supervisor_id; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_supervisor_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3919 (class 0 OID 0)
-- Dependencies: 305
-- Name: seq_supervisor_id; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_supervisor_id OWNED BY public.supervisor.supervisor_id;


--
-- TOC entry 306 (class 1259 OID 25051)
-- Name: team; Type: TABLE; Schema: public; 
--

CREATE TABLE public.team (
    team_id integer NOT NULL,
    team_name character varying(2048),
    team_creation date,
    team_end date,
    team_last_report date,
    laboratory_id integer NOT NULL
);


--
-- TOC entry 307 (class 1259 OID 25054)
-- Name: seq_team; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_team
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;


--
-- TOC entry 3920 (class 0 OID 0)
-- Dependencies: 307
-- Name: seq_team; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_team OWNED BY public.team.team_id;


--
-- TOC entry 308 (class 1259 OID 25056)
-- Name: team_referent; Type: TABLE; Schema: public; 
--

CREATE TABLE public.team_referent (
    team_referent_id integer NOT NULL,
    researcher_id integer NOT NULL,
    team_id integer NOT NULL,
    team_referent_start date,
    team_referent_end date
);


--
-- TOC entry 309 (class 1259 OID 25059)
-- Name: seq_team_referent; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_team_referent
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3921 (class 0 OID 0)
-- Dependencies: 309
-- Name: seq_team_referent; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_team_referent OWNED BY public.team_referent.team_referent_id;


--
-- TOC entry 310 (class 1259 OID 25061)
-- Name: tool_product_type; Type: TABLE; Schema: public; 
--

CREATE TABLE public.tool_product_type (
    tool_product_type_id integer NOT NULL,
    tool_product_type_name character varying(2048) NOT NULL
);

insert into public.tool_product_type (tool_product_type_id, tool_product_type_name) values (1, 'DECISION_SUPPORT_TOOL');
insert into public.tool_product_type (tool_product_type_id, tool_product_type_name) values (2, 'BIOCOLLECTION');
insert into public.tool_product_type (tool_product_type_id, tool_product_type_name) values (3, 'SOFTWARE');
insert into public.tool_product_type (tool_product_type_id, tool_product_type_name) values (4, 'DATABASE');
insert into public.tool_product_type (tool_product_type_id, tool_product_type_name) values (5, 'COHORT');


--
-- TOC entry 311 (class 1259 OID 25064)
-- Name: seq_tool_product; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_tool_product
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3922 (class 0 OID 0)
-- Dependencies: 311
-- Name: seq_tool_product; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_tool_product OWNED BY public.tool_product_type.tool_product_type_id;


--
-- TOC entry 312 (class 1259 OID 25066)
-- Name: tool_product_role; Type: TABLE; Schema: public; 
--

CREATE TABLE public.tool_product_role (
    tool_product_role_id integer NOT NULL,
    tool_product_role_name character varying(2048) NOT NULL
);


--
-- TOC entry 313 (class 1259 OID 25069)
-- Name: seq_tool_product_role; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_tool_product_role
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3923 (class 0 OID 0)
-- Dependencies: 313
-- Name: seq_tool_product_role; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_tool_product_role OWNED BY public.tool_product_role.tool_product_role_id;


--
-- TOC entry 314 (class 1259 OID 25071)
-- Name: type_activity; Type: TABLE; Schema: public; 
--

CREATE TABLE public.type_activity (
    id_type_activity integer NOT NULL,
    name_type character varying(2048)
);


--
-- TOC entry 316 (class 1259 OID 25076)
-- Name: type_collab; Type: TABLE; Schema: public; 
--

CREATE TABLE public.type_collab (
    type_collab_id integer NOT NULL,
    name_choice character varying(2048)
);

--
-- TOC entry 317 (class 1259 OID 25079)
-- Name: seq_type_collab; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_type_collab
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3925 (class 0 OID 0)
-- Dependencies: 317
-- Name: seq_type_collab; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_type_collab OWNED BY public.type_collab.type_collab_id;

INSERT INTO public.type_collab (type_collab_id, name_choice) VALUES (1, 'Thesis co-supervision');
INSERT INTO public.type_collab (type_collab_id, name_choice) VALUES (2, 'Joint research project');
INSERT INTO public.type_collab (type_collab_id, name_choice) VALUES (3, 'International laboratory (LIA, LEA)');
INSERT INTO public.type_collab (type_collab_id, name_choice) VALUES (4, 'Others');
SELECT pg_catalog.setval('public.seq_type_collab', 4, true);


--
-- TOC entry 320 (class 1259 OID 25086)
-- Name: type_patent; Type: TABLE; Schema: public; 
--

CREATE TABLE public.type_patent (
    type_patent_id integer NOT NULL,
    name_choice character varying(2048)
);


--
-- TOC entry 321 (class 1259 OID 25089)
-- Name: seq_type_patent; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_type_patent
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3927 (class 0 OID 0)
-- Dependencies: 321
-- Name: seq_type_patent; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_type_patent OWNED BY public.type_patent.type_patent_id;


--
-- TOC entry 322 (class 1259 OID 25091)
-- Name: type_research_contract; Type: TABLE; Schema: public; 
--

CREATE TABLE public.type_research_contract (
    id_type integer NOT NULL,
    name_choice character varying(2048)
);


--
-- TOC entry 323 (class 1259 OID 25094)
-- Name: seq_type_research; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.seq_type_research
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3928 (class 0 OID 0)
-- Dependencies: 323
-- Name: seq_type_research; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.seq_type_research OWNED BY public.type_research_contract.id_type;

INSERT INTO public.type_research_contract (id_type, name_choice) VALUES (1, 'ERC grants - coordination');
INSERT INTO public.type_research_contract (id_type, name_choice) VALUES (2, 'Other European grants (H2020, MSCA,…) - coordination');
INSERT INTO public.type_research_contract (id_type, name_choice) VALUES (3, 'Other European grants (H2020, MSCA,…) - partnership');
INSERT INTO public.type_research_contract (id_type, name_choice) VALUES (4, 'International (outside Europe) ((NSF, JSPS, NIH, World Bank, FAO, etc.) grants - coordination');
INSERT INTO public.type_research_contract (id_type, name_choice) VALUES (5, 'International (outside Europe) ((NSF, JSPS, NIH, World Bank, FAO, etc.) grants - partnership');
INSERT INTO public.type_research_contract (id_type, name_choice) VALUES (6, 'National public grants (ANR, PHRC, FUI, INCA, etc.) - coordination');
INSERT INTO public.type_research_contract (id_type, name_choice) VALUES (7, 'National public grants (ANR, PHRC, FUI, INCA, etc.) - partnership');
INSERT INTO public.type_research_contract (id_type, name_choice) VALUES (8, 'PIA (labex, equipex etc.) grants - coordination');
INSERT INTO public.type_research_contract (id_type, name_choice) VALUES (9, 'PIA (labex, equipex etc.) grants - partnership');
INSERT INTO public.type_research_contract (id_type, name_choice) VALUES (10, 'Grants from foundations and charities (ARC, FMR, FRM, etc.) - coordination');
INSERT INTO public.type_research_contract (id_type, name_choice) VALUES (11, 'Grants from foundations and charities (ARC, FMR, FRM, etc.) - partnership');
INSERT INTO public.type_research_contract (id_type, name_choice) VALUES (12, 'Local grants (collectivités territoriales) - coordination');
INSERT INTO public.type_research_contract (id_type, name_choice) VALUES (13, 'Local grants (collectivités territoriales) - partnership');
INSERT INTO public.type_research_contract (id_type, name_choice) VALUES (14, 'Internal calls in the frame of PIA (Labex, Idex, I-Site) from the university, hospital centre,... - coordination');
INSERT INTO public.type_research_contract (id_type, name_choice) VALUES (15, 'Internal calls in the frame of PIA (Labex, Idex, I-Site) from the university, hospital centre,... - partnership');
INSERT INTO public.type_research_contract (id_type, name_choice) VALUES (16, 'Others');
SELECT pg_catalog.setval('public.seq_type_research', 16, true);



--
-- TOC entry 324 (class 1259 OID 25096)
-- Name: sr_award; Type: TABLE; Schema: public; 
--

CREATE TABLE public.sr_award (
    id_activity integer NOT NULL,
    awardee_name character varying(2048),
    award_date date,
    description text
);


--
-- TOC entry 325 (class 1259 OID 25102)
-- Name: supervisor_id_supervisor_seq; Type: SEQUENCE; Schema: public; Owner: prweb
--

CREATE SEQUENCE public.supervisor_id_supervisor_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 326 (class 1259 OID 25104)
-- Name: tool_product; Type: TABLE; Schema: public; 
--

CREATE TABLE public.tool_product (
    id_activity integer NOT NULL,
    tool_product_type_id integer NOT NULL,
    tool_product_name character varying(2048),
    tool_product_creation date NOT NULL,
    tool_product_authors text NOT NULL,
    tool_product_description text NOT NULL
);


--
-- TOC entry 327 (class 1259 OID 25110)
-- Name: tool_product_involvement; Type: TABLE; Schema: public;
--

CREATE TABLE public.tool_product_involvement (
    id_activity integer NOT NULL,
    tool_product_role_id integer NOT NULL,
    tool_product_involvement_researchers text
);


--
-- TOC entry 328 (class 1259 OID 25116)
-- Name: type_consortium; Type: TABLE; Schema: public; 
--

CREATE TABLE public.type_consortium (
    type_consortium_id integer NOT NULL,
    type_consortium_name character varying(2048)
);


--
-- TOC entry 329 (class 1259 OID 25119)
-- Name: type_consortium_type_consortium_id_seq; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.type_consortium_type_consortium_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3929 (class 0 OID 0)
-- Dependencies: 329
-- Name: type_consortium_type_consortium_id_seq; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.type_consortium_type_consortium_id_seq OWNED BY public.type_consortium.type_consortium_id;


--
-- TOC entry 330 (class 1259 OID 25121)
-- Name: type_thesis; Type: TABLE; Schema: public; 
--

CREATE TABLE public.type_thesis (
    type_thesis_id integer NOT NULL,
    type_thesis_name character varying(2048)
);


--
-- TOC entry 331 (class 1259 OID 25124)
-- Name: type_thesis_type_thesis_id_seq; Type: SEQUENCE; Schema: public; 
--

CREATE SEQUENCE public.type_thesis_type_thesis_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3930 (class 0 OID 0)
-- Dependencies: 331
-- Name: type_thesis_type_thesis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; 
--

ALTER SEQUENCE public.type_thesis_type_thesis_id_seq OWNED BY public.type_thesis.type_thesis_id;


--
-- TOC entry 3312 (class 2604 OID 25127)
-- Name: belongs_team id_belongs_team; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.belongs_team ALTER COLUMN id_belongs_team SET DEFAULT nextval('public.seq_belongs_team'::regclass);


--
-- TOC entry 3313 (class 2604 OID 25128)
-- Name: company company_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.company ALTER COLUMN company_id SET DEFAULT nextval('public.seq_company'::regclass);


--
-- TOC entry 3316 (class 2604 OID 25129)
-- Name: contract id_contract; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.contract ALTER COLUMN id_contract SET DEFAULT nextval('public.seq_contract'::regclass);


--
-- TOC entry 3317 (class 2604 OID 25130)
-- Name: contract_type id_contract_type; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.contract_type ALTER COLUMN id_contract_type SET DEFAULT nextval('public.seq_contract_type'::regclass);


--
-- TOC entry 3318 (class 2604 OID 25131)
-- Name: education_involvement education_involvement_id; Type: DEFAULT; Schema: public;
--

ALTER TABLE ONLY public.education_involvement ALTER COLUMN education_involvement_id SET DEFAULT nextval('public.seq_education_involvement'::regclass);


--
-- TOC entry 3319 (class 2604 OID 25132)
-- Name: education_level education_level_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.education_level ALTER COLUMN education_level_id SET DEFAULT nextval('public.seq_education_level'::regclass);


--
-- TOC entry 3320 (class 2604 OID 25133)
-- Name: employer id_employer; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.employer ALTER COLUMN id_employer SET DEFAULT nextval('public.seq_employer'::regclass);


--
-- TOC entry 3321 (class 2604 OID 25134)
-- Name: evaluation_thesis_role evaluation_thesis_role_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.evaluation_thesis_role ALTER COLUMN evaluation_thesis_role_id SET DEFAULT nextval('public.evaluation_thesis_role_evaluation_thesis_role_id_seq'::regclass);


--
-- TOC entry 3322 (class 2604 OID 25135)
-- Name: function_editorial_activity function_editorial_activity_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.function_editorial_activity ALTER COLUMN function_editorial_activity_id SET DEFAULT nextval('public.seq_function_editorial_activity'::regclass);


--
-- TOC entry 3323 (class 2604 OID 25136)
-- Name: funder funder_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.funder ALTER COLUMN funder_id SET DEFAULT nextval('public.seq_funder'::regclass);


--
-- TOC entry 3324 (class 2604 OID 25137)
-- Name: institution institution_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.institution ALTER COLUMN institution_id SET DEFAULT nextval('public.seq_institution'::regclass);


--
-- TOC entry 3325 (class 2604 OID 25138)
-- Name: journal journal_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.journal ALTER COLUMN journal_id SET DEFAULT nextval('public.seq_journal'::regclass);


--
-- TOC entry 3326 (class 2604 OID 25139)
-- Name: laboratory laboratory_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.laboratory ALTER COLUMN laboratory_id SET DEFAULT nextval('public.seq_laboratory'::regclass);


--
-- TOC entry 3327 (class 2604 OID 25140)
-- Name: laboratory_evaluation_role laboratory_evaluation_role_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.laboratory_evaluation_role ALTER COLUMN laboratory_evaluation_role_id SET DEFAULT nextval('public.seq_laboratory_evaluation_role'::regclass);


--
-- TOC entry 3328 (class 2604 OID 25141)
-- Name: language language_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.language ALTER COLUMN language_id SET DEFAULT nextval('public.seq_language'::regclass);


--
-- TOC entry 3329 (class 2604 OID 25142)
-- Name: learned_scientific_society_role learned_scientific_society_role_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.learned_scientific_society_role ALTER COLUMN learned_scientific_society_role_id SET DEFAULT nextval('public.seq_learned_scientific_society_role'::regclass);


--
-- TOC entry 3330 (class 2604 OID 25143)
-- Name: mail_activity mail_activity_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.mail_activity ALTER COLUMN mail_activity_id SET DEFAULT nextval('public.seq_mail_activity'::regclass);


--
-- TOC entry 3331 (class 2604 OID 25144)
-- Name: mail_template mail_template_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.mail_template ALTER COLUMN mail_template_id SET DEFAULT nextval('public.seq_mail_template'::regclass);


--
-- TOC entry 3332 (class 2604 OID 25145)
-- Name: meeting meeting_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.meeting ALTER COLUMN meeting_id SET DEFAULT nextval('public.seq_meeting'::regclass);


--
-- TOC entry 3333 (class 2604 OID 25146)
-- Name: nationality nationality_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.nationality ALTER COLUMN nationality_id SET DEFAULT nextval('public.seq_nationality'::regclass);


--
-- TOC entry 3334 (class 2604 OID 25147)
-- Name: parameter parameter_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.parameter ALTER COLUMN parameter_id SET DEFAULT nextval('public.seq_parameter'::regclass);


--
-- TOC entry 3339 (class 2604 OID 25148)
-- Name: phd_student phd_student_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.phd_student ALTER COLUMN phd_student_id SET DEFAULT nextval('public.seq_phd_student'::regclass);


--
-- TOC entry 3340 (class 2604 OID 25149)
-- Name: thesis_type thesis_type_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.thesis_type ALTER COLUMN thesis_type_id SET DEFAULT nextval('public.seq_thesis_type'::regclass);


--
-- TOC entry 3341 (class 2604 OID 25150)
-- Name: project_evaluation_category project_evaluation_category_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.project_evaluation_category ALTER COLUMN project_evaluation_category_id SET DEFAULT nextval('public.seq_project_evaluation_category'::regclass);


--
-- TOC entry 3342 (class 2604 OID 25151)
-- Name: project_evaluation_role project_evaluation_role_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.project_evaluation_role ALTER COLUMN project_evaluation_role_id SET DEFAULT nextval('public.seq_project_evaluation_role'::regclass);


--
-- TOC entry 3343 (class 2604 OID 25152)
-- Name: public_outreach_type public_outreach_type_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.public_outreach_type ALTER COLUMN public_outreach_type_id SET DEFAULT nextval('public.seq_public_outreach_type'::regclass);


--
-- TOC entry 3347 (class 2604 OID 25153)
-- Name: publication_type publication_type_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.publication_type ALTER COLUMN publication_type_id SET DEFAULT nextval('public.seq_choice_publication'::regclass);


--
-- TOC entry 3348 (class 2604 OID 25154)
-- Name: researcher researcher_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.researcher ALTER COLUMN researcher_id SET DEFAULT nextval('public.seq_researcher'::regclass);


--
-- TOC entry 3349 (class 2604 OID 25155)
-- Name: scientific_expertise_type scientific_expertise_type_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.scientific_expertise_type ALTER COLUMN scientific_expertise_type_id SET DEFAULT nextval('public.scientific_expertise_type_scientific_expertise_type_id_seq'::regclass);


--
-- TOC entry 3350 (class 2604 OID 25156)
-- Name: status id_status; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.status ALTER COLUMN id_status SET DEFAULT nextval('public.seq_status'::regclass);


--
-- TOC entry 3352 (class 2604 OID 25157)
-- Name: supervisor supervisor_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.supervisor ALTER COLUMN supervisor_id SET DEFAULT nextval('public.seq_supervisor_id'::regclass);


--
-- TOC entry 3353 (class 2604 OID 25158)
-- Name: team team_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.team ALTER COLUMN team_id SET DEFAULT nextval('public.seq_team'::regclass);


--
-- TOC entry 3354 (class 2604 OID 25159)
-- Name: team_referent team_referent_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.team_referent ALTER COLUMN team_referent_id SET DEFAULT nextval('public.seq_team_referent'::regclass);


--
-- TOC entry 3356 (class 2604 OID 25160)
-- Name: tool_product_role tool_product_role_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.tool_product_role ALTER COLUMN tool_product_role_id SET DEFAULT nextval('public.seq_tool_product_role'::regclass);


--
-- TOC entry 3355 (class 2604 OID 25161)
-- Name: tool_product_type tool_product_type_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.tool_product_type ALTER COLUMN tool_product_type_id SET DEFAULT nextval('public.seq_tool_product'::regclass);


--
-- TOC entry 3358 (class 2604 OID 25163)
-- Name: type_collab type_collab_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.type_collab ALTER COLUMN type_collab_id SET DEFAULT nextval('public.seq_type_collab'::regclass);


--
-- TOC entry 3362 (class 2604 OID 25164)
-- Name: type_consortium type_consortium_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.type_consortium ALTER COLUMN type_consortium_id SET DEFAULT nextval('public.type_consortium_type_consortium_id_seq'::regclass);


--
-- TOC entry 3360 (class 2604 OID 25166)
-- Name: type_patent type_patent_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.type_patent ALTER COLUMN type_patent_id SET DEFAULT nextval('public.seq_type_patent'::regclass);


--
-- TOC entry 3361 (class 2604 OID 25167)
-- Name: type_research_contract id_type; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.type_research_contract ALTER COLUMN id_type SET DEFAULT nextval('public.seq_type_research'::regclass);


--
-- TOC entry 3363 (class 2604 OID 25168)
-- Name: type_thesis type_thesis_id; Type: DEFAULT; Schema: public; 
--

ALTER TABLE ONLY public.type_thesis ALTER COLUMN type_thesis_id SET DEFAULT nextval('public.type_thesis_type_thesis_id_seq'::regclass);


--
-- TOC entry 3751 (class 0 OID 24663)
-- Dependencies: 200
-- Data for Name: activity; Type: TABLE DATA; Schema: public; 
--

--
-- TOC entry 3752 (class 0 OID 24666)
-- Dependencies: 201
-- Data for Name: activity_researcher; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3754 (class 0 OID 24672)
-- Dependencies: 203
-- Data for Name: admin; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3755 (class 0 OID 24675)
-- Dependencies: 204
-- Data for Name: belongs_team; Type: TABLE DATA; Schema: public; 
--


--
-- TOC entry 3757 (class 0 OID 24680)
-- Dependencies: 206
-- Data for Name: book; Type: TABLE DATA; Schema: public; 
--


--
-- TOC entry 3758 (class 0 OID 24686)
-- Dependencies: 207
-- Data for Name: book_chapter; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3761 (class 0 OID 24696)
-- Dependencies: 210
-- Data for Name: company; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3762 (class 0 OID 24699)
-- Dependencies: 211
-- Data for Name: company_creation; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3763 (class 0 OID 24703)
-- Dependencies: 212
-- Data for Name: connection; Type: TABLE DATA; Schema: public; 
--


--
-- TOC entry 3764 (class 0 OID 24710)
-- Dependencies: 213
-- Data for Name: contract; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3765 (class 0 OID 24713)
-- Dependencies: 214
-- Data for Name: contract_type; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3766 (class 0 OID 24716)
-- Dependencies: 215
-- Data for Name: editorial_activity; Type: TABLE DATA; Schema: public; 
--


--
-- TOC entry 3767 (class 0 OID 24722)
-- Dependencies: 216
-- Data for Name: education; Type: TABLE DATA; Schema: public; 
--


--
-- TOC entry 3768 (class 0 OID 24728)
-- Dependencies: 217
-- Data for Name: education_involvement; Type: TABLE DATA; Schema: public;
--


--
-- TOC entry 3769 (class 0 OID 24731)
-- Dependencies: 218
-- Data for Name: education_level; Type: TABLE DATA; Schema: public; 
--


--
-- TOC entry 3770 (class 0 OID 24734)
-- Dependencies: 219
-- Data for Name: employer; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3772 (class 0 OID 24739)
-- Dependencies: 221
-- Data for Name: evaluation_thesis; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3773 (class 0 OID 24742)
-- Dependencies: 222
-- Data for Name: evaluation_thesis_role; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3775 (class 0 OID 24747)
-- Dependencies: 224
-- Data for Name: function_editorial_activity; Type: TABLE DATA; Schema: public; 
--

--
-- TOC entry 3776 (class 0 OID 24750)
-- Dependencies: 225
-- Data for Name: funder; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3777 (class 0 OID 24756)
-- Dependencies: 226
-- Data for Name: incoming_mobility; Type: TABLE DATA; Schema: public; 
--

--
-- TOC entry 3778 (class 0 OID 24762)
-- Dependencies: 227
-- Data for Name: institution; Type: TABLE DATA; Schema: public; 
--

INSERT INTO public.institution (institution_id, institution_name) VALUES (1, 'CNRS');
INSERT INTO public.institution (institution_id, institution_name) VALUES (2, 'INSERM');
INSERT INTO public.institution (institution_id, institution_name) VALUES (3, 'INRIA');
SELECT pg_catalog.setval('public.seq_institution', 3, true);

--
-- TOC entry 3779 (class 0 OID 24765)
-- Dependencies: 228
-- Data for Name: institutional_comitee; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3780 (class 0 OID 24768)
-- Dependencies: 229
-- Data for Name: invited_seminar; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3781 (class 0 OID 24774)
-- Dependencies: 230
-- Data for Name: journal; Type: TABLE DATA; Schema: public; 
--

--
-- TOC entry 3782 (class 0 OID 24777)
-- Dependencies: 231
-- Data for Name: labcom_creation; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3783 (class 0 OID 24783)
-- Dependencies: 232
-- Data for Name: laboratory; Type: TABLE DATA; Schema: public; 
--

INSERT INTO public.laboratory (laboratory_id, laboratory_name, laboratory_acronym, institution_id) VALUES (1, 'Centre de Recherche en Transplantation et Immunologie', 'CRTI', 2);
SELECT pg_catalog.setval('public.seq_laboratory', 1, true);

--
-- TOC entry 3784 (class 0 OID 24786)
-- Dependencies: 233
-- Data for Name: laboratory_evaluation; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3785 (class 0 OID 24789)
-- Dependencies: 234
-- Data for Name: laboratory_evaluation_role; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3786 (class 0 OID 24792)
-- Dependencies: 235
-- Data for Name: language; Type: TABLE DATA; Schema: public; 
--

INSERT INTO public.language (language_id, language_name) VALUES (1, 'Français');
INSERT INTO public.language (language_id, language_name) VALUES (2, 'English');
SELECT pg_catalog.setval('public.seq_language', 2, true);

--
-- TOC entry 3787 (class 0 OID 24795)
-- Dependencies: 236
-- Data for Name: learned_scientific_society; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3788 (class 0 OID 24798)
-- Dependencies: 237
-- Data for Name: learned_scientific_society_role; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3789 (class 0 OID 24801)
-- Dependencies: 238
-- Data for Name: mail_activity; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3790 (class 0 OID 24804)
-- Dependencies: 239
-- Data for Name: mail_template; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3791 (class 0 OID 24810)
-- Dependencies: 240
-- Data for Name: meeting; Type: TABLE DATA; Schema: public; 
--


--
-- TOC entry 3792 (class 0 OID 24816)
-- Dependencies: 241
-- Data for Name: meeting_congress_org; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3793 (class 0 OID 24819)
-- Dependencies: 242
-- Data for Name: national_international_collaboration; Type: TABLE DATA; Schema: public; 
--


--
-- TOC entry 3794 (class 0 OID 24825)
-- Dependencies: 243
-- Data for Name: nationality; Type: TABLE DATA; Schema: public; 
--

INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (1, 'Afghan');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (2, 'Albanais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (3, 'Algerien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (4, 'Allemand');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (5, 'Americain');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (6, 'Andorran');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (7, 'Angolais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (8, 'Antigua');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (9, 'Antillais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (10, 'Apatride');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (11, 'Arabe');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (12, 'Argentin');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (13, 'Armenien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (14, 'Australien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (15, 'Autre Nationalite');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (16, 'Autrichien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (17, 'Azerbaïdjanais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (18, 'Bahaméen');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (19, 'Bahrein');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (20, 'Barbade');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (21, 'Belaruss');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (22, 'Belge');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (23, 'Belize');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (24, 'Bengladeshi');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (25, 'Beninois');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (26, 'Bhoutanais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (27, 'Birman');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (28, 'Bolivien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (29, 'Bosniaque');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (30, 'Botswanais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (31, 'Bresilien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (32, 'Britannique');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (33, 'Brunei Darussalam');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (34, 'Bulgare');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (35, 'Burkinabé');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (36, 'Burundais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (37, 'Cambodgien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (38, 'Camerounais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (39, 'Canadien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (40, 'Capverdien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (41, 'Centrafricai');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (42, 'Chilien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (43, 'Chinois');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (44, 'Chypriote');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (45, 'Colombien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (46, 'Comorien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (47, 'Congolais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (48, 'Costa Ricai');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (49, 'Croate');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (50, 'Cubain');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (51, 'Danois');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (52, 'Djiboutien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (53, 'Dominicai');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (54, 'Dominicain');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (55, 'Egyptien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (56, 'Equato-guineen');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (57, 'Equatorien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (58, 'Erytreen');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (59, 'Espagnole');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (60, 'Estonien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (61, 'Ethiopien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (62, 'Etranger sans autre indication');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (63, 'Fidjien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (64, 'Finlandais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (65, 'Français');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (66, 'Gabonais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (67, 'Gambien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (68, 'Georgien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (69, 'Ghanéen');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (70, 'Gibraltar');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (71, 'Grecque');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (72, 'Grenade');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (73, 'Grenadin');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (74, 'Groenlandais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (75, 'Guatémaltèque');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (76, 'Guineen');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (77, 'Guyanais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (78, 'Haïtien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (79, 'Hondurien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (80, 'Hongrois');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (81, 'Indien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (82, 'Indonésien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (83, 'Irakien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (84, 'Iranien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (85, 'Irlandais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (86, 'Islandais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (87, 'Israëlien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (88, 'Italien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (89, 'Ivoirien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (90, 'Jamaicai');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (91, 'Japonais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (92, 'Jordanien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (93, 'Kazaque');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (94, 'Kenya');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (95, 'Kirghis');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (96, 'Kiribati');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (97, 'Kosovar');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (98, 'Koweitien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (99, 'Laotien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (100, 'Lesotho');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (101, 'Letto');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (102, 'Libanais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (103, 'Libérien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (104, 'Libyen');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (105, 'Liechtensteinien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (106, 'Lithuanien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (107, 'Luxembourgeois');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (108, 'Malaisien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (109, 'Malawien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (110, 'Maldivais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (111, 'Malgache');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (112, 'Malien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (113, 'Maltais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (114, 'Marocain');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (115, 'Mauricien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (116, 'Mauritanien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (117, 'Mexicain');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (118, 'Moldave');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (119, 'Monegasque');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (120, 'Mongole');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (121, 'Montenegro');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (122, 'Mozambicai');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (123, 'Namibien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (124, 'Nauru');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (125, 'Neerlandais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (126, 'Neozelandais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (127, 'Nepalais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (128, 'Nicaraguayen');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (129, 'Nigeria');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (130, 'Nigérien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (131, 'Nord-Coréen');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (132, 'Norvegien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (133, 'Omanais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (134, 'Ougandais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (135, 'Ouzbèque');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (136, 'Pakistanais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (137, 'Palestinien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (138, 'Panaméen');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (139, 'Papoue');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (140, 'Paraguayen');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (141, 'Peruvien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (142, 'Philippin');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (143, 'Polonais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (144, 'Portugais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (145, 'Qatari');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (146, 'Roumain');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (147, 'Russe');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (148, 'Rwandais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (149, 'Sainte Helenite');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (150, 'Sainte Lucien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (151, 'Salomon');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (152, 'Salvadorien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (153, 'Samoen');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (154, 'San-Marinais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (155, 'Sao Toméen');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (156, 'Senegalais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (157, 'Séoudien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (158, 'Serbe');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (159, 'Seychellois');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (160, 'Sierra-leonais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (161, 'Singapourien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (162, 'Slovaque');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (163, 'Slovene');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (164, 'Somalien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (165, 'Soudanais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (166, 'Sri-Lankais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (167, 'Sud-Africain');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (168, 'Sud-Coréen');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (169, 'Suedois');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (170, 'Suisse');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (171, 'Surinamien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (172, 'Swaeiland');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (173, 'Syrien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (174, 'Tadjique');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (175, 'Taiwanais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (176, 'Tanzanien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (177, 'Tchadien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (178, 'Tcheque');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (179, 'Thaïlandais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (180, 'Togolais');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (181, 'Tongéen');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (182, 'Trinideen');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (183, 'Tunisien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (184, 'Turkme');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (185, 'Turque');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (186, 'Tuvalu');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (187, 'Ukrainien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (188, 'Uruguayen');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (189, 'Vanuatu');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (190, 'Vatican');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (191, 'Vénézuélien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (192, 'Vietnamien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (193, 'Yemenite');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (194, 'Yougoslave');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (195, 'Zambien');
INSERT INTO public.nationality (nationality_id, nationality_name) VALUES (196, 'Zimbabwen');
SELECT pg_catalog.setval('public.seq_nationality', 196, true);

--
-- TOC entry 3795 (class 0 OID 24828)
-- Dependencies: 244
-- Data for Name: network; Type: TABLE DATA; Schema: public; 
--


--
-- TOC entry 3796 (class 0 OID 24834)
-- Dependencies: 245
-- Data for Name: oral_communication; Type: TABLE DATA; Schema: public; 
--

--
-- TOC entry 3797 (class 0 OID 24840)
-- Dependencies: 246
-- Data for Name: outgoing_mobility; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3798 (class 0 OID 24846)
-- Dependencies: 247
-- Data for Name: parameter; Type: TABLE DATA; Schema: public; 
--

INSERT INTO public.parameter (parameter_id, parameter_name, parameter_value) VALUES (1, 'loadCsv', 'true');
SELECT pg_catalog.setval('public.seq_parameter', 1, true);

--
-- TOC entry 3799 (class 0 OID 24852)
-- Dependencies: 248
-- Data for Name: patent; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3800 (class 0 OID 24861)
-- Dependencies: 249
-- Data for Name: thesis_associated_company; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3801 (class 0 OID 24864)
-- Dependencies: 250
-- Data for Name: phd_student; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3802 (class 0 OID 24871)
-- Dependencies: 251
-- Data for Name: thesis_type; Type: TABLE DATA; Schema: public; 
--

INSERT INTO public.thesis_type (thesis_type_id, thesis_type_name) VALUES (1, 'Academic');
INSERT INTO public.thesis_type (thesis_type_id, thesis_type_name) VALUES (2, 'CIFRE');
SELECT pg_catalog.setval('public.seq_thesis_type', 2, true);

--
-- TOC entry 3803 (class 0 OID 24874)
-- Dependencies: 252
-- Data for Name: platform; Type: TABLE DATA; Schema: public; 
--


--
-- TOC entry 3804 (class 0 OID 24880)
-- Dependencies: 253
-- Data for Name: post_doc; Type: TABLE DATA; Schema: public; 
--


--
-- TOC entry 3805 (class 0 OID 24886)
-- Dependencies: 254
-- Data for Name: project_evaluation; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3806 (class 0 OID 24892)
-- Dependencies: 255
-- Data for Name: project_evaluation_category; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3807 (class 0 OID 24895)
-- Dependencies: 256
-- Data for Name: project_evaluation_role; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3808 (class 0 OID 24898)
-- Dependencies: 257
-- Data for Name: public_outreach; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3809 (class 0 OID 24901)
-- Dependencies: 258
-- Data for Name: public_outreach_type; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3810 (class 0 OID 24904)
-- Dependencies: 259
-- Data for Name: publication; Type: TABLE DATA; Schema: public; 
--


--
-- TOC entry 3811 (class 0 OID 24910)
-- Dependencies: 260
-- Data for Name: publication_statistics; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3812 (class 0 OID 24916)
-- Dependencies: 261
-- Data for Name: publication_type; Type: TABLE DATA; Schema: public; 
--

INSERT INTO public.publication_type (publication_type_id, publication_type_name) VALUES (1, 'Publication');
SELECT pg_catalog.setval('public.seq_choice_publication', 1, true);

--
-- TOC entry 3813 (class 0 OID 24919)
-- Dependencies: 262
-- Data for Name: research_contract_funded_public_charitable_inst; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3814 (class 0 OID 24925)
-- Dependencies: 263
-- Data for Name: researcher; Type: TABLE DATA; Schema: public; 
--


--
-- TOC entry 3815 (class 0 OID 24931)
-- Dependencies: 264
-- Data for Name: researcher_nationality; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3816 (class 0 OID 24934)
-- Dependencies: 265
-- Data for Name: reviewing_journal_articles; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3817 (class 0 OID 24940)
-- Dependencies: 266
-- Data for Name: scientific_expertise; Type: TABLE DATA; Schema: public; 
--

--
-- TOC entry 3818 (class 0 OID 24946)
-- Dependencies: 267
-- Data for Name: scientific_expertise_type; Type: TABLE DATA; Schema: public; 
--


--
-- TOC entry 3820 (class 0 OID 24951)
-- Dependencies: 269
-- Data for Name: sei_cifre_fellowship; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3821 (class 0 OID 24957)
-- Dependencies: 270
-- Data for Name: sei_clinical_trial; Type: TABLE DATA; Schema: public; 
--

--
-- TOC entry 3822 (class 0 OID 24963)
-- Dependencies: 271
-- Data for Name: sei_industrial_r_d_contract; Type: TABLE DATA; Schema: public; 
--


--
-- TOC entry 3823 (class 0 OID 24969)
-- Dependencies: 272
-- Data for Name: sei_lead_consortium_industry; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3824 (class 0 OID 24975)
-- Dependencies: 273
-- Data for Name: sei_network_unit_creation; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3875 (class 0 OID 25096)
-- Dependencies: 324
-- Data for Name: sr_award; Type: TABLE DATA; Schema: public; 
--


--
-- TOC entry 3853 (class 0 OID 25037)
-- Dependencies: 302
-- Data for Name: status; Type: TABLE DATA; Schema: public; 
--

INSERT INTO public.status (id_status, name_status) VALUES (1, 'Professeurs et assimilés');
INSERT INTO public.status (id_status, name_status) VALUES (2, 'Maîtres de conférences et assimilés');
INSERT INTO public.status (id_status, name_status) VALUES (3, 'Directeurs de recherche et assimilés');
INSERT INTO public.status (id_status, name_status) VALUES (4, 'Chargés de recherche et assimilés');
INSERT INTO public.status (id_status, name_status) VALUES (5, 'Conservateurs, cadres scientifiques EPIC, fondations, industries...');
INSERT INTO public.status (id_status, name_status) VALUES (6, 'Professeurs du secondaire détachés dans le supérieur');
INSERT INTO public.status (id_status, name_status) VALUES (7, 'ITA-BIATSS, autres personnels cadre et non cadre EPIC...');
INSERT INTO public.status (id_status, name_status) VALUES (8, 'Enseignants-chercheurs non titulaires, émérites et autres');
INSERT INTO public.status (id_status, name_status) VALUES (9, 'Chercheurs non titulaires, émérites et autres (excepté doctorants)');
INSERT INTO public.status (id_status, name_status) VALUES (10, 'Doctorants');
INSERT INTO public.status (id_status, name_status) VALUES (11, 'Autres personnels non titulaires');
INSERT INTO public.status (id_status, name_status) VALUES (12, 'Enseignants-chercheurs non titulaires, émérites et autres');
SELECT pg_catalog.setval('public.seq_status', 12, true);


--
-- TOC entry 3855 (class 0 OID 25042)
-- Dependencies: 304
-- Data for Name: supervisor; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3857 (class 0 OID 25051)
-- Dependencies: 306
-- Data for Name: team; Type: TABLE DATA; Schema: public; 
--

--
-- TOC entry 3859 (class 0 OID 25056)
-- Dependencies: 308
-- Data for Name: team_referent; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3877 (class 0 OID 25104)
-- Dependencies: 326
-- Data for Name: tool_product; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3878 (class 0 OID 25110)
-- Dependencies: 327
-- Data for Name: tool_product_involvement; Type: TABLE DATA; Schema: public;
--



--
-- TOC entry 3863 (class 0 OID 25066)
-- Dependencies: 312
-- Data for Name: tool_product_role; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3861 (class 0 OID 25061)
-- Dependencies: 310
-- Data for Name: tool_product_type; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3865 (class 0 OID 25071)
-- Dependencies: 314
-- Data for Name: type_activity; Type: TABLE DATA; Schema: public; 
--

INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (1, 'Publication');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (2, 'Book');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (3, 'Book Chapter');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (4, 'Patent Licence Invention Disclosure');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (5, 'Editorial Activity');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (6, 'Platform');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (7, 'Tool Product Decision Support Tool');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (8, 'Tool Product BioList');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (9, 'Tool Product Software');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (10, 'Tool Product Database');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (11, 'Tool Product Cohort');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (12, 'Educational Output');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (13, 'National International Collaboration');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (14, 'Network');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (15, 'Invited Seminar');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (16, 'Scientific Expertise');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (17, 'Research Contract Funded Public Charitable Inst');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (18, 'Training Thesis Publication');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (19, 'Involvement Training M1 M2 Trainee Hosting');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (20, 'Involvement Training Pedagogical Responsibility');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (21, 'Post Doc');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (22, 'Public Outreach');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (23, 'Reviewing Journal Articles');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (24, 'Project Evaluation Thesis');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (25, 'Project Evaluation Grant');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (26, 'Lab Evaluation');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (27, 'Responsibility Institutional Comitee Jury');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (28, 'Sr Responsibility Learned Scientific Society');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (29, 'Sr Award');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (30, 'Meeting Congress Org');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (31, 'Invited Oral Communication');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (32, 'Oral Communication Poster');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (33, 'Outgoing Mobility');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (34, 'Incoming Mobility');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (35, 'Sei Cifre Fellowship');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (36, 'Sei Labcom Creation');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (37, 'Sei Network Unit Creation');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (38, 'Sei Company Creation');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (39, 'Sei Lead Consortium Industry');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (40, 'Sei Industrial R D Contract');
INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (41, 'Sei Clinical Trial');

-- Application defined activity types

INSERT INTO public.type_activity (id_type_activity, name_type) VALUES (1001, 'Education Formation');


--
-- TOC entry 3867 (class 0 OID 25076)
-- Dependencies: 316
-- Data for Name: type_collab; Type: TABLE DATA; Schema: public; 
--


--
-- TOC entry 3879 (class 0 OID 25116)
-- Dependencies: 328
-- Data for Name: type_consortium; Type: TABLE DATA; Schema: public; 
--


--
-- TOC entry 3871 (class 0 OID 25086)
-- Dependencies: 320
-- Data for Name: type_patent; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3873 (class 0 OID 25091)
-- Dependencies: 322
-- Data for Name: type_research_contract; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3881 (class 0 OID 25121)
-- Dependencies: 330
-- Data for Name: type_thesis; Type: TABLE DATA; Schema: public; 
--



--
-- TOC entry 3383 (class 2606 OID 25170)
-- Name: connection connection_pkey; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.connection
    ADD CONSTRAINT connection_pkey PRIMARY KEY (connection_code);


--
-- TOC entry 3367 (class 2606 OID 25174)
-- Name: activity_researcher pk_activity_researcher; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.activity_researcher
    ADD CONSTRAINT pk_activity_researcher PRIMARY KEY (researcher_id, id_activity);

--
-- TOC entry 3371 (class 2606 OID 25178)
-- Name: admin pk_admin; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT pk_admin PRIMARY KEY (researcher_id);


--
-- TOC entry 3373 (class 2606 OID 25180)
-- Name: belongs_team pk_belongs_team; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.belongs_team
    ADD CONSTRAINT pk_belongs_team PRIMARY KEY (id_belongs_team);


--
-- TOC entry 3375 (class 2606 OID 25182)
-- Name: book pk_book; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT pk_book PRIMARY KEY (id_activity);


--
-- TOC entry 3377 (class 2606 OID 25184)
-- Name: book_chapter pk_book_chapter; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.book_chapter
    ADD CONSTRAINT pk_book_chapter PRIMARY KEY (id_activity);


--
-- TOC entry 3379 (class 2606 OID 25186)
-- Name: company pk_company; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT pk_company PRIMARY KEY (company_id);


--
-- TOC entry 3381 (class 2606 OID 25188)
-- Name: company_creation pk_company_creation; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.company_creation
    ADD CONSTRAINT pk_company_creation PRIMARY KEY (id_activity);


--
-- TOC entry 3385 (class 2606 OID 25190)
-- Name: contract pk_contract; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.contract
    ADD CONSTRAINT pk_contract PRIMARY KEY (id_contract);


--
-- TOC entry 3387 (class 2606 OID 25192)
-- Name: contract_type pk_contract_type; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.contract_type
    ADD CONSTRAINT pk_contract_type PRIMARY KEY (id_contract_type);


--
-- TOC entry 3389 (class 2606 OID 25194)
-- Name: editorial_activity pk_editorial_activity; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.editorial_activity
    ADD CONSTRAINT pk_editorial_activity PRIMARY KEY (id_activity);


--
-- TOC entry 3391 (class 2606 OID 25196)
-- Name: education pk_education; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.education
    ADD CONSTRAINT pk_education PRIMARY KEY (id_activity);


--
-- TOC entry 3393 (class 2606 OID 25198)
-- Name: education_involvement pk_education_involvement; Type: CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY public.education_involvement
    ADD CONSTRAINT pk_education_involvement PRIMARY KEY (education_involvement_id);


--
-- TOC entry 3395 (class 2606 OID 25200)
-- Name: education_level pk_education_level; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.education_level
    ADD CONSTRAINT pk_education_level PRIMARY KEY (education_level_id);


--
-- TOC entry 3397 (class 2606 OID 25202)
-- Name: employer pk_employer; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.employer
    ADD CONSTRAINT pk_employer PRIMARY KEY (id_employer);


--
-- TOC entry 3399 (class 2606 OID 25204)
-- Name: evaluation_thesis pk_evaluation_thesis; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.evaluation_thesis
    ADD CONSTRAINT pk_evaluation_thesis PRIMARY KEY (id_activity);


ALTER TABLE ONLY public.training_thesis
    ADD CONSTRAINT pk_training_thesis PRIMARY KEY (id_activity);

--
-- TOC entry 3401 (class 2606 OID 25206)
-- Name: evaluation_thesis_role pk_evaluation_thesis_role; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.evaluation_thesis_role
    ADD CONSTRAINT pk_evaluation_thesis_role PRIMARY KEY (evaluation_thesis_role_id);


--
-- TOC entry 3403 (class 2606 OID 25208)
-- Name: function_editorial_activity pk_function_editorial_activity; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.function_editorial_activity
    ADD CONSTRAINT pk_function_editorial_activity PRIMARY KEY (function_editorial_activity_id);


--
-- TOC entry 3405 (class 2606 OID 25210)
-- Name: funder pk_funder; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.funder
    ADD CONSTRAINT pk_funder PRIMARY KEY (funder_id);


--
-- TOC entry 3407 (class 2606 OID 25212)
-- Name: incoming_mobility pk_incoming_mobility; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.incoming_mobility
    ADD CONSTRAINT pk_incoming_mobility PRIMARY KEY (id_activity);


--
-- TOC entry 3409 (class 2606 OID 25214)
-- Name: institution pk_institution; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.institution
    ADD CONSTRAINT pk_institution PRIMARY KEY (institution_id);


--
-- TOC entry 3411 (class 2606 OID 25216)
-- Name: institutional_comitee pk_institutional_comitee; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.institutional_comitee
    ADD CONSTRAINT pk_institutional_comitee PRIMARY KEY (id_activity);


--
-- TOC entry 3413 (class 2606 OID 25218)
-- Name: invited_seminar pk_invited_seminar; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.invited_seminar
    ADD CONSTRAINT pk_invited_seminar PRIMARY KEY (id_activity);


--
-- TOC entry 3415 (class 2606 OID 25220)
-- Name: journal pk_journal; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.journal
    ADD CONSTRAINT pk_journal PRIMARY KEY (journal_id);


--
-- TOC entry 3417 (class 2606 OID 25222)
-- Name: labcom_creation pk_labcom_creation; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.labcom_creation
    ADD CONSTRAINT pk_labcom_creation PRIMARY KEY (id_activity);


--
-- TOC entry 3419 (class 2606 OID 25224)
-- Name: laboratory pk_laboratory; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.laboratory
    ADD CONSTRAINT pk_laboratory PRIMARY KEY (laboratory_id);


--
-- TOC entry 3421 (class 2606 OID 25226)
-- Name: laboratory_evaluation pk_laboratory_evaluation; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.laboratory_evaluation
    ADD CONSTRAINT pk_laboratory_evaluation PRIMARY KEY (id_activity);


--
-- TOC entry 3423 (class 2606 OID 25228)
-- Name: laboratory_evaluation_role pk_laboratory_evaluation_role; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.laboratory_evaluation_role
    ADD CONSTRAINT pk_laboratory_evaluation_role PRIMARY KEY (laboratory_evaluation_role_id);


--
-- TOC entry 3425 (class 2606 OID 25230)
-- Name: language pk_language; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.language
    ADD CONSTRAINT pk_language PRIMARY KEY (language_id);


--
-- TOC entry 3427 (class 2606 OID 25232)
-- Name: learned_scientific_society pk_learned_scientific_society; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.learned_scientific_society
    ADD CONSTRAINT pk_learned_scientific_society PRIMARY KEY (id_activity);


--
-- TOC entry 3429 (class 2606 OID 25234)
-- Name: learned_scientific_society_role pk_learned_scientific_society_role; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.learned_scientific_society_role
    ADD CONSTRAINT pk_learned_scientific_society_role PRIMARY KEY (learned_scientific_society_role_id);


--
-- TOC entry 3431 (class 2606 OID 25236)
-- Name: mail_activity pk_mail_activity; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.mail_activity
    ADD CONSTRAINT pk_mail_activity PRIMARY KEY (mail_activity_id);


--
-- TOC entry 3433 (class 2606 OID 25238)
-- Name: mail_template pk_mail_template; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.mail_template
    ADD CONSTRAINT pk_mail_template PRIMARY KEY (mail_template_id);


--
-- TOC entry 3435 (class 2606 OID 25240)
-- Name: meeting pk_meeting; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.meeting
    ADD CONSTRAINT pk_meeting PRIMARY KEY (meeting_id);


--
-- TOC entry 3437 (class 2606 OID 25242)
-- Name: meeting_congress_org pk_meeting_congress_org; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.meeting_congress_org
    ADD CONSTRAINT pk_meeting_congress_org PRIMARY KEY (id_activity);


--
-- TOC entry 3439 (class 2606 OID 25244)
-- Name: national_international_collaboration pk_national_international_collaboration; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.national_international_collaboration
    ADD CONSTRAINT pk_national_international_collaboration PRIMARY KEY (id_activity);


--
-- TOC entry 3441 (class 2606 OID 25246)
-- Name: nationality pk_nationality; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.nationality
    ADD CONSTRAINT pk_nationality PRIMARY KEY (nationality_id);


--
-- TOC entry 3443 (class 2606 OID 25248)
-- Name: network pk_network; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.network
    ADD CONSTRAINT pk_network PRIMARY KEY (id_activity);


--
-- TOC entry 3445 (class 2606 OID 25250)
-- Name: oral_communication pk_oral_communication; Type: CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY public.oral_communication_poster
    ADD CONSTRAINT pk_oral_communication PRIMARY KEY (id_activity);


--
-- TOC entry 3447 (class 2606 OID 25252)
-- Name: outgoing_mobility pk_outgoing_mobility; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.outgoing_mobility
    ADD CONSTRAINT pk_outgoing_mobility PRIMARY KEY (id_activity);


--
-- TOC entry 3449 (class 2606 OID 25254)
-- Name: parameter pk_parameter; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.parameter
    ADD CONSTRAINT pk_parameter PRIMARY KEY (parameter_id);


--
-- TOC entry 3451 (class 2606 OID 25256)
-- Name: patent pk_patent; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.patent
    ADD CONSTRAINT pk_patent PRIMARY KEY (id_activity);


--
-- TOC entry 3453 (class 2606 OID 25258)
-- Name: thesis_associated_company pk_thesis_associated_company; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.thesis_associated_company
    ADD CONSTRAINT pk_thesis_associated_company PRIMARY KEY (id_activity, company_id);


--
-- TOC entry 3455 (class 2606 OID 25260)
-- Name: phd_student pk_phd_student; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.phd_student
    ADD CONSTRAINT pk_phd_student PRIMARY KEY (phd_student_id);


--
-- TOC entry 3457 (class 2606 OID 25262)
-- Name: thesis_type pk_thesis_type; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.thesis_type
    ADD CONSTRAINT pk_thesis_type PRIMARY KEY (thesis_type_id);


--
-- TOC entry 3459 (class 2606 OID 25264)
-- Name: platform pk_platform; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.platform
    ADD CONSTRAINT pk_platform PRIMARY KEY (id_activity);


--
-- TOC entry 3461 (class 2606 OID 25266)
-- Name: post_doc pk_post_doc; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.post_doc
    ADD CONSTRAINT pk_post_doc PRIMARY KEY (id_activity);


--
-- TOC entry 3463 (class 2606 OID 25268)
-- Name: project_evaluation pk_project_evaluation; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.project_evaluation
    ADD CONSTRAINT pk_project_evaluation PRIMARY KEY (id_activity);


--
-- TOC entry 3465 (class 2606 OID 25270)
-- Name: project_evaluation_category pk_project_evaluation_category; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.project_evaluation_category
    ADD CONSTRAINT pk_project_evaluation_category PRIMARY KEY (project_evaluation_category_id);


--
-- TOC entry 3467 (class 2606 OID 25272)
-- Name: project_evaluation_role pk_project_evaluation_role; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.project_evaluation_role
    ADD CONSTRAINT pk_project_evaluation_role PRIMARY KEY (project_evaluation_role_id);


--
-- TOC entry 3469 (class 2606 OID 25274)
-- Name: public_outreach pk_public_outreach; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.public_outreach
    ADD CONSTRAINT pk_public_outreach PRIMARY KEY (id_activity);


--
-- TOC entry 3471 (class 2606 OID 25276)
-- Name: public_outreach_type pk_public_outreach_type; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.public_outreach_type
    ADD CONSTRAINT pk_public_outreach_type PRIMARY KEY (public_outreach_type_id);


--
-- TOC entry 3473 (class 2606 OID 25278)
-- Name: publication pk_publication; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.publication
    ADD CONSTRAINT pk_publication PRIMARY KEY (id_activity);


--
-- TOC entry 3475 (class 2606 OID 25280)
-- Name: publication_statistics pk_publication_statistics; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.publication_statistics
    ADD CONSTRAINT pk_publication_statistics PRIMARY KEY (team_id, publication_statistics_year);


--
-- TOC entry 3477 (class 2606 OID 25282)
-- Name: publication_type pk_publication_type; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.publication_type
    ADD CONSTRAINT pk_publication_type PRIMARY KEY (publication_type_id);


--
-- TOC entry 3479 (class 2606 OID 25284)
-- Name: research_contract_funded_public_charitable_inst pk_research_contract_funded_public_charitable_inst; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.research_contract_funded_public_charitable_inst
    ADD CONSTRAINT pk_research_contract_funded_public_charitable_inst PRIMARY KEY (id_activity);


--
-- TOC entry 3481 (class 2606 OID 25286)
-- Name: researcher pk_researcher; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.researcher
    ADD CONSTRAINT pk_researcher PRIMARY KEY (researcher_id);


--
-- TOC entry 3483 (class 2606 OID 25288)
-- Name: researcher_nationality pk_researcher_nationality; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.researcher_nationality
    ADD CONSTRAINT pk_researcher_nationality PRIMARY KEY (nationality_id, researcher_id);


--
-- TOC entry 3485 (class 2606 OID 25290)
-- Name: reviewing_journal_articles pk_reviewing_journal_articles; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.reviewing_journal_articles
    ADD CONSTRAINT pk_reviewing_journal_articles PRIMARY KEY (id_activity);


--
-- TOC entry 3487 (class 2606 OID 25292)
-- Name: scientific_expertise pk_scientific_expertise; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.scientific_expertise
    ADD CONSTRAINT pk_scientific_expertise PRIMARY KEY (id_activity);


--
-- TOC entry 3489 (class 2606 OID 25294)
-- Name: scientific_expertise_type pk_scientific_expertise_type; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.scientific_expertise_type
    ADD CONSTRAINT pk_scientific_expertise_type PRIMARY KEY (scientific_expertise_type_id);


--
-- TOC entry 3491 (class 2606 OID 25296)
-- Name: sei_cifre_fellowship pk_sei_cifre_fellowship; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.sei_cifre_fellowship
    ADD CONSTRAINT pk_sei_cifre_fellowship PRIMARY KEY (id_activity);


--
-- TOC entry 3493 (class 2606 OID 25298)
-- Name: sei_clinical_trial pk_sei_clinical_trial; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.sei_clinical_trial
    ADD CONSTRAINT pk_sei_clinical_trial PRIMARY KEY (id_activity);


--
-- TOC entry 3495 (class 2606 OID 25300)
-- Name: sei_industrial_r_d_contract pk_sei_industrial_r_d_contract; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.sei_industrial_r_d_contract
    ADD CONSTRAINT pk_sei_industrial_r_d_contract PRIMARY KEY (id_activity);


--
-- TOC entry 3497 (class 2606 OID 25302)
-- Name: sei_lead_consortium_industry pk_sei_lead_consortium_industry; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.sei_lead_consortium_industry
    ADD CONSTRAINT pk_sei_lead_consortium_industry PRIMARY KEY (id_activity);


--
-- TOC entry 3499 (class 2606 OID 25304)
-- Name: sei_network_unit_creation pk_sei_network_unit_creation; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.sei_network_unit_creation
    ADD CONSTRAINT pk_sei_network_unit_creation PRIMARY KEY (id_activity);


--
-- TOC entry 3523 (class 2606 OID 25306)
-- Name: sr_award pk_sr_award; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.sr_award
    ADD CONSTRAINT pk_sr_award PRIMARY KEY (id_activity);


--
-- TOC entry 3501 (class 2606 OID 25308)
-- Name: status pk_status; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT pk_status PRIMARY KEY (id_status);


--
-- TOC entry 3503 (class 2606 OID 25310)
-- Name: supervisor pk_supervisor; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.supervisor
    ADD CONSTRAINT pk_supervisor PRIMARY KEY (supervisor_id);


--
-- TOC entry 3505 (class 2606 OID 25312)
-- Name: team pk_team; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT pk_team PRIMARY KEY (team_id);


--
-- TOC entry 3507 (class 2606 OID 25314)
-- Name: team_referent pk_team_referent; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.team_referent
    ADD CONSTRAINT pk_team_referent PRIMARY KEY (team_referent_id);


--
-- TOC entry 3525 (class 2606 OID 25316)
-- Name: tool_product pk_tool_product; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.tool_product
    ADD CONSTRAINT pk_tool_product PRIMARY KEY (id_activity);


--
-- TOC entry 3527 (class 2606 OID 25318)
-- Name: tool_product_involvement pk_tool_product_involvement; Type: CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY public.tool_product_involvement
    ADD CONSTRAINT pk_tool_product_involvement PRIMARY KEY (id_activity, tool_product_role_id);


--
-- TOC entry 3511 (class 2606 OID 25320)
-- Name: tool_product_role pk_tool_product_role; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.tool_product_role
    ADD CONSTRAINT pk_tool_product_role PRIMARY KEY (tool_product_role_id);


--
-- TOC entry 3509 (class 2606 OID 25322)
-- Name: tool_product_type pk_tool_product_type; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.tool_product_type
    ADD CONSTRAINT pk_tool_product_type PRIMARY KEY (tool_product_type_id);


--
-- TOC entry 3513 (class 2606 OID 25324)
-- Name: type_activity pk_type_activity; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.type_activity
    ADD CONSTRAINT pk_type_activity PRIMARY KEY (id_type_activity);


--
-- TOC entry 3515 (class 2606 OID 25326)
-- Name: type_collab pk_type_collab; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.type_collab
    ADD CONSTRAINT pk_type_collab PRIMARY KEY (type_collab_id);


--
-- TOC entry 3529 (class 2606 OID 25328)
-- Name: type_consortium pk_type_consortium; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.type_consortium
    ADD CONSTRAINT pk_type_consortium PRIMARY KEY (type_consortium_id);

--
-- TOC entry 3519 (class 2606 OID 25332)
-- Name: type_patent pk_type_patent; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.type_patent
    ADD CONSTRAINT pk_type_patent PRIMARY KEY (type_patent_id);


--
-- TOC entry 3521 (class 2606 OID 25334)
-- Name: type_research_contract pk_type_research_contract; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.type_research_contract
    ADD CONSTRAINT pk_type_research_contract PRIMARY KEY (id_type);


--
-- TOC entry 3531 (class 2606 OID 25336)
-- Name: type_thesis pk_type_thesis; Type: CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.type_thesis
    ADD CONSTRAINT pk_type_thesis PRIMARY KEY (type_thesis_id);


--
-- TOC entry 3533 (class 2606 OID 25337)
-- Name: activity_researcher activity_activity_researcher_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.activity_researcher
    ADD CONSTRAINT activity_activity_researcher_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);

--
-- TOC entry 3542 (class 2606 OID 25347)
-- Name: book_chapter activity_book_chapter_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.book_chapter
    ADD CONSTRAINT activity_book_chapter_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3540 (class 2606 OID 25352)
-- Name: book activity_book_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT activity_book_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3550 (class 2606 OID 25357)
-- Name: editorial_activity activity_editorial_activity_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.editorial_activity
    ADD CONSTRAINT activity_editorial_activity_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3553 (class 2606 OID 25362)
-- Name: education activity_education_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.education
    ADD CONSTRAINT activity_education_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3559 (class 2606 OID 25367)
-- Name: incoming_mobility activity_incoming_mobility_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.incoming_mobility
    ADD CONSTRAINT activity_incoming_mobility_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3562 (class 2606 OID 25372)
-- Name: invited_seminar activity_invited_seminar_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.invited_seminar
    ADD CONSTRAINT activity_invited_seminar_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3565 (class 2606 OID 25377)
-- Name: laboratory_evaluation activity_lab_evaluation_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.laboratory_evaluation
    ADD CONSTRAINT activity_lab_evaluation_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3569 (class 2606 OID 25382)
-- Name: mail_activity activity_mail_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.mail_activity
    ADD CONSTRAINT activity_mail_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3571 (class 2606 OID 25387)
-- Name: meeting_congress_org activity_meeting_congress_org_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.meeting_congress_org
    ADD CONSTRAINT activity_meeting_congress_org_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3573 (class 2606 OID 25392)
-- Name: national_international_collaboration activity_national_international_collaboration_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.national_international_collaboration
    ADD CONSTRAINT activity_national_international_collaboration_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3575 (class 2606 OID 25397)
-- Name: network activity_network_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.network
    ADD CONSTRAINT activity_network_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3576 (class 2606 OID 25402)
-- Name: oral_communication activity_oral_communication_poster_fk; Type: FK CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY public.oral_communication_poster
    ADD CONSTRAINT activity_oral_communication_poster_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3579 (class 2606 OID 25407)
-- Name: outgoing_mobility activity_outgoing_mobility_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.outgoing_mobility
    ADD CONSTRAINT activity_outgoing_mobility_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3580 (class 2606 OID 25412)
-- Name: patent activity_patent_licence_invention_disclosure_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.patent
    ADD CONSTRAINT activity_patent_licence_invention_disclosure_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3586 (class 2606 OID 25417)
-- Name: platform activity_platform_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.platform
    ADD CONSTRAINT activity_platform_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3587 (class 2606 OID 25422)
-- Name: post_doc activity_post_doc_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.post_doc
    ADD CONSTRAINT activity_post_doc_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3588 (class 2606 OID 25427)
-- Name: project_evaluation activity_project_evaluation_grant_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.project_evaluation
    ADD CONSTRAINT activity_project_evaluation_grant_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3556 (class 2606 OID 25432)
-- Name: evaluation_thesis activity_project_evaluation_thesis_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.evaluation_thesis
    ADD CONSTRAINT activity_project_evaluation_thesis_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3592 (class 2606 OID 25437)
-- Name: public_outreach activity_public_outreach_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.public_outreach
    ADD CONSTRAINT activity_public_outreach_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3594 (class 2606 OID 25442)
-- Name: publication activity_publication_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.publication
    ADD CONSTRAINT activity_publication_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


ALTER TABLE ONLY public.training_thesis
    ADD CONSTRAINT activity_training_thesis_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);

ALTER TABLE ONLY public.training_thesis
    ADD CONSTRAINT phd_student_training_thesis_fk FOREIGN KEY (phd_student_id) REFERENCES public.phd_student(phd_student_id);

ALTER TABLE ONLY public.phd_student
    ADD CONSTRAINT nationality_phd_student_fk FOREIGN KEY (nationality_id) REFERENCES public.nationality(nationality_id);
--
-- TOC entry 3597 (class 2606 OID 25447)
-- Name: research_contract_funded_public_charitable_inst activity_research_contract_funded_public_charitable_inst_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.research_contract_funded_public_charitable_inst
    ADD CONSTRAINT activity_research_contract_funded_public_charitable_inst_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3560 (class 2606 OID 25452)
-- Name: institutional_comitee activity_responsibility_institutional_comitee_jury_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.institutional_comitee
    ADD CONSTRAINT activity_responsibility_institutional_comitee_jury_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3601 (class 2606 OID 25457)
-- Name: reviewing_journal_articles activity_reviewing_journal_articles_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.reviewing_journal_articles
    ADD CONSTRAINT activity_reviewing_journal_articles_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3603 (class 2606 OID 25462)
-- Name: scientific_expertise activity_scientific_expertise_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.scientific_expertise
    ADD CONSTRAINT activity_scientific_expertise_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3605 (class 2606 OID 25467)
-- Name: sei_cifre_fellowship activity_sei_cifre_fellowship_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.sei_cifre_fellowship
    ADD CONSTRAINT activity_sei_cifre_fellowship_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3606 (class 2606 OID 25472)
-- Name: sei_clinical_trial activity_sei_clinical_trial_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.sei_clinical_trial
    ADD CONSTRAINT activity_sei_clinical_trial_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3544 (class 2606 OID 25477)
-- Name: company_creation activity_sei_company_creation_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.company_creation
    ADD CONSTRAINT activity_sei_company_creation_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3607 (class 2606 OID 25482)
-- Name: sei_industrial_r_d_contract activity_sei_industrial_r_d_contract_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.sei_industrial_r_d_contract
    ADD CONSTRAINT activity_sei_industrial_r_d_contract_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3563 (class 2606 OID 25487)
-- Name: labcom_creation activity_sei_labcom_creation_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.labcom_creation
    ADD CONSTRAINT activity_sei_labcom_creation_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3608 (class 2606 OID 25492)
-- Name: sei_lead_consortium_industry activity_sei_lead_consortium_industry_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.sei_lead_consortium_industry
    ADD CONSTRAINT activity_sei_lead_consortium_industry_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3610 (class 2606 OID 25497)
-- Name: sei_network_unit_creation activity_sei_network_unit_creation_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.sei_network_unit_creation
    ADD CONSTRAINT activity_sei_network_unit_creation_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3616 (class 2606 OID 25502)
-- Name: sr_award activity_sr_award_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.sr_award
    ADD CONSTRAINT activity_sr_award_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3567 (class 2606 OID 25507)
-- Name: learned_scientific_society activity_sr_responsibility_learned_scientific_society_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.learned_scientific_society
    ADD CONSTRAINT activity_sr_responsibility_learned_scientific_society_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3617 (class 2606 OID 25512)
-- Name: tool_product activity_tool_product_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.tool_product
    ADD CONSTRAINT activity_tool_product_fk FOREIGN KEY (id_activity) REFERENCES public.activity(id_activity);


--
-- TOC entry 3589 (class 2606 OID 25517)
-- Name: project_evaluation category_grant_project_evaluation_grant_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.project_evaluation
    ADD CONSTRAINT category_grant_project_evaluation_grant_fk FOREIGN KEY (project_evaluation_category_id) REFERENCES public.project_evaluation_category(project_evaluation_category_id);


--
-- TOC entry 3611 (class 2606 OID 25522)
-- Name: supervisor chercheur_encadrant_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.supervisor
    ADD CONSTRAINT chercheur_encadrant_fk FOREIGN KEY (researcher_id) REFERENCES public.researcher(researcher_id);


--
-- TOC entry 3581 (class 2606 OID 25527)
-- Name: patent choice_patent_licence_invention_disclosure_patent_licence_in35; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.patent
    ADD CONSTRAINT choice_patent_licence_invention_disclosure_patent_licence_in35 FOREIGN KEY (type_patent_id) REFERENCES public.type_patent(type_patent_id);


--
-- TOC entry 3593 (class 2606 OID 25532)
-- Name: public_outreach choice_public_outreach_public_outreach_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.public_outreach
    ADD CONSTRAINT choice_public_outreach_public_outreach_fk FOREIGN KEY (public_outreach_type_id) REFERENCES public.public_outreach_type(public_outreach_type_id);


--
-- TOC entry 3598 (class 2606 OID 25537)
-- Name: research_contract_funded_public_charitable_inst choice_research_contract_funded_public_charitable_inst_resear51; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.research_contract_funded_public_charitable_inst
    ADD CONSTRAINT choice_research_contract_funded_public_charitable_inst_resear51 FOREIGN KEY (id_type) REFERENCES public.type_research_contract(id_type);


--
-- TOC entry 3604 (class 2606 OID 25542)
-- Name: scientific_expertise choice_scientific_expertise_scientific_expertise_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.scientific_expertise
    ADD CONSTRAINT choice_scientific_expertise_scientific_expertise_fk FOREIGN KEY (scientific_expertise_type_id) REFERENCES public.scientific_expertise_type(scientific_expertise_type_id);


--
-- TOC entry 3574 (class 2606 OID 25547)
-- Name: national_international_collaboration choice_type_collab_national_international_collaboration_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.national_international_collaboration
    ADD CONSTRAINT choice_type_collab_national_international_collaboration_fk FOREIGN KEY (type_collab_id) REFERENCES public.type_collab(type_collab_id);


--
-- TOC entry 3582 (class 2606 OID 25552)
-- Name: thesis_associated_company company_thesis_associated_company_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.thesis_associated_company
    ADD CONSTRAINT company_thesis_associated_company_fk FOREIGN KEY (company_id) REFERENCES public.company(company_id);


--
-- TOC entry 3546 (class 2606 OID 25557)
-- Name: contract contract_type_contract_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.contract
    ADD CONSTRAINT contract_type_contract_fk FOREIGN KEY (id_contract_type) REFERENCES public.contract_type(id_contract_type);


--
-- TOC entry 3554 (class 2606 OID 25562)
-- Name: education education_involvement_education_fk; Type: FK CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY public.education
    ADD CONSTRAINT education_involvement_education_fk FOREIGN KEY (education_involvement_id) REFERENCES public.education_involvement(education_involvement_id);


--
-- TOC entry 3555 (class 2606 OID 25567)
-- Name: education education_level_education_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.education
    ADD CONSTRAINT education_level_education_fk FOREIGN KEY (education_level_id) REFERENCES public.education_level(education_level_id);


--
-- TOC entry 3547 (class 2606 OID 25572)
-- Name: contract employer_contract_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.contract
    ADD CONSTRAINT employer_contract_fk FOREIGN KEY (id_employer) REFERENCES public.employer(id_employer);


--
-- TOC entry 3551 (class 2606 OID 25577)
-- Name: editorial_activity function_electronic_tool_product_1_editorial_activity_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.editorial_activity
    ADD CONSTRAINT function_electronic_tool_product_1_editorial_activity_fk FOREIGN KEY (function_editorial_activity_id) REFERENCES public.function_editorial_activity(function_editorial_activity_id);


--
-- TOC entry 3590 (class 2606 OID 25582)
-- Name: project_evaluation funder_project_evaluation_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.project_evaluation
    ADD CONSTRAINT funder_project_evaluation_fk FOREIGN KEY (funder_id) REFERENCES public.funder(funder_id);


--
-- TOC entry 3564 (class 2606 OID 25587)
-- Name: laboratory institution_laboratory_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.laboratory
    ADD CONSTRAINT institution_laboratory_fk FOREIGN KEY (institution_id) REFERENCES public.institution(institution_id);


--
-- TOC entry 3552 (class 2606 OID 25592)
-- Name: editorial_activity journal_editorial_activity_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.editorial_activity
    ADD CONSTRAINT journal_editorial_activity_fk FOREIGN KEY (journal_id) REFERENCES public.journal(journal_id);


--
-- TOC entry 3602 (class 2606 OID 25597)
-- Name: reviewing_journal_articles journal_reviewing_journal_articles_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.reviewing_journal_articles
    ADD CONSTRAINT journal_reviewing_journal_articles_fk FOREIGN KEY (journal_id) REFERENCES public.journal(journal_id);


--
-- TOC entry 3613 (class 2606 OID 25602)
-- Name: team laboratory_team_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT laboratory_team_fk FOREIGN KEY (laboratory_id) REFERENCES public.laboratory(laboratory_id);


--
-- TOC entry 3543 (class 2606 OID 25607)
-- Name: book_chapter language_book_chapter_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.book_chapter
    ADD CONSTRAINT language_book_chapter_fk FOREIGN KEY (language_id) REFERENCES public.language(language_id);


--
-- TOC entry 3541 (class 2606 OID 25612)
-- Name: book language_book_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT language_book_fk FOREIGN KEY (language_id) REFERENCES public.language(language_id);


--
-- TOC entry 3570 (class 2606 OID 25617)
-- Name: mail_activity mail_template_mail_activity_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.mail_activity
    ADD CONSTRAINT mail_template_mail_activity_fk FOREIGN KEY (mail_template_id) REFERENCES public.mail_template(mail_template_id);


--
-- TOC entry 3572 (class 2606 OID 25622)
-- Name: meeting_congress_org meeting_meeting_congress_org_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.meeting_congress_org
    ADD CONSTRAINT meeting_meeting_congress_org_fk FOREIGN KEY (meeting_id) REFERENCES public.meeting(meeting_id);


--
-- TOC entry 3577 (class 2606 OID 25627)
-- Name: oral_communication meeting_oral_communication_fk; Type: FK CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY public.oral_communication_poster
    ADD CONSTRAINT meeting_oral_communication_fk FOREIGN KEY (meeting_id) REFERENCES public.meeting(meeting_id);


--
-- TOC entry 3599 (class 2606 OID 25632)
-- Name: researcher_nationality nationality_researcher_nationality_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.researcher_nationality
    ADD CONSTRAINT nationality_researcher_nationality_fk FOREIGN KEY (nationality_id) REFERENCES public.nationality(nationality_id);


--
-- TOC entry 3583 (class 2606 OID 25637)
-- Name: thesis_associated_company training_thesis_thesis_associated_company_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.thesis_associated_company
    ADD CONSTRAINT training_thesis_associated_company_fk FOREIGN KEY (id_activity) REFERENCES public.training_thesis(id_activity);


--
-- TOC entry 3612 (class 2606 OID 25642)
-- Name: supervisor phd_student_supervisor_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.supervisor
    ADD CONSTRAINT phd_student_supervisor_fk FOREIGN KEY (phd_student_id) REFERENCES public.phd_student(phd_student_id);


--
-- TOC entry 3584 (class 2606 OID 25647)
-- Name: phd_student thesis_type_phd_student_fk; Type: FK CONSTRAINT; Schema: public; 
--



--
-- TOC entry 3595 (class 2606 OID 25652)
-- Name: publication publication_type_publication_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.publication
    ADD CONSTRAINT publication_type_publication_fk FOREIGN KEY (publication_type_id) REFERENCES public.publication_type(publication_type_id);


--
-- TOC entry 3534 (class 2606 OID 25657)
-- Name: activity_researcher researcher_activity_researcher_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.activity_researcher
    ADD CONSTRAINT researcher_activity_researcher_fk FOREIGN KEY (researcher_id) REFERENCES public.researcher(researcher_id);


--
-- TOC entry 3537 (class 2606 OID 25662)
-- Name: admin researcher_admin_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT researcher_admin_fk FOREIGN KEY (researcher_id) REFERENCES public.researcher(researcher_id);


--
-- TOC entry 3538 (class 2606 OID 25667)
-- Name: belongs_team researcher_belongs_team_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.belongs_team
    ADD CONSTRAINT researcher_belongs_team_fk FOREIGN KEY (researcher_id) REFERENCES public.researcher(researcher_id);


--
-- TOC entry 3545 (class 2606 OID 25672)
-- Name: connection researcher_connection_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.connection
    ADD CONSTRAINT researcher_connection_fk FOREIGN KEY (researcher_id) REFERENCES public.researcher(researcher_id);


--
-- TOC entry 3548 (class 2606 OID 25677)
-- Name: contract researcher_contract_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.contract
    ADD CONSTRAINT researcher_contract_fk FOREIGN KEY (researcher_id) REFERENCES public.researcher(researcher_id);


--
-- TOC entry 3585 (class 2606 OID 25682)
-- Name: phd_student researcher_phd_student_fk; Type: FK CONSTRAINT; Schema: public; 
--



--
-- TOC entry 3600 (class 2606 OID 25687)
-- Name: researcher_nationality researcher_researcher_nationality_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.researcher_nationality
    ADD CONSTRAINT researcher_researcher_nationality_fk FOREIGN KEY (researcher_id) REFERENCES public.researcher(researcher_id);


--
-- TOC entry 3614 (class 2606 OID 25692)
-- Name: team_referent researcher_team_referent_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.team_referent
    ADD CONSTRAINT researcher_team_referent_fk FOREIGN KEY (researcher_id) REFERENCES public.researcher(researcher_id);


--
-- TOC entry 3591 (class 2606 OID 25697)
-- Name: project_evaluation role_pi_grant_project_evaluation_grant_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.project_evaluation
    ADD CONSTRAINT role_pi_grant_project_evaluation_grant_fk FOREIGN KEY (project_evaluation_role_id) REFERENCES public.project_evaluation_role(project_evaluation_role_id);


--
-- TOC entry 3566 (class 2606 OID 25702)
-- Name: laboratory_evaluation role_pi_lab_eval_lab_evaluation_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.laboratory_evaluation
    ADD CONSTRAINT role_pi_lab_eval_lab_evaluation_fk FOREIGN KEY (laboratory_evaluation_role_id) REFERENCES public.laboratory_evaluation_role(laboratory_evaluation_role_id);


--
-- TOC entry 3561 (class 2606 OID 25707)
-- Name: institutional_comitee role_pi_lab_eval_responsibility_institutional_comitee_jury_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.institutional_comitee
    ADD CONSTRAINT role_pi_lab_eval_responsibility_institutional_comitee_jury_fk FOREIGN KEY (laboratory_evaluation_role_id) REFERENCES public.laboratory_evaluation_role(laboratory_evaluation_role_id);


--
-- TOC entry 3568 (class 2606 OID 25712)
-- Name: learned_scientific_society role_pi_scientific_recognition_scientific_recognition_respon970; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.learned_scientific_society
    ADD CONSTRAINT role_pi_scientific_recognition_scientific_recognition_respon970 FOREIGN KEY (learned_scientific_society_role_id) REFERENCES public.learned_scientific_society_role(learned_scientific_society_role_id);


--
-- TOC entry 3557 (class 2606 OID 25717)
-- Name: evaluation_thesis role_pi_thesis_project_evaluation_thesis_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.evaluation_thesis
    ADD CONSTRAINT role_pi_thesis_project_evaluation_thesis_fk FOREIGN KEY (evaluation_thesis_role_id) REFERENCES public.evaluation_thesis_role(evaluation_thesis_role_id);


--
-- TOC entry 3549 (class 2606 OID 25722)
-- Name: contract status_contract_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.contract
    ADD CONSTRAINT status_contract_fk FOREIGN KEY (id_status) REFERENCES public.status(id_status);

--
-- TOC entry 3539 (class 2606 OID 25732)
-- Name: belongs_team team_belongs_team_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.belongs_team
    ADD CONSTRAINT team_belongs_team_fk FOREIGN KEY (team_id) REFERENCES public.team(team_id);


--
-- TOC entry 3596 (class 2606 OID 25737)
-- Name: publication_statistics team_publication_statistics_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.publication_statistics
    ADD CONSTRAINT team_publication_statistics_fk FOREIGN KEY (team_id) REFERENCES public.team(team_id);


--
-- TOC entry 3615 (class 2606 OID 25742)
-- Name: team_referent team_team_referent_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.team_referent
    ADD CONSTRAINT team_team_referent_fk FOREIGN KEY (team_id) REFERENCES public.team(team_id);


--
-- TOC entry 3619 (class 2606 OID 25747)
-- Name: tool_product_involvement tool_product_role_tool_product_involvement_fk; Type: FK CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY public.tool_product_involvement
    ADD CONSTRAINT tool_product_role_tool_product_involvement_fk FOREIGN KEY (tool_product_role_id) REFERENCES public.tool_product_role(tool_product_role_id);


--
-- TOC entry 3620 (class 2606 OID 25752)
-- Name: tool_product_involvement tool_product_tool_product_involvement_fk; Type: FK CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY public.tool_product_involvement
    ADD CONSTRAINT tool_product_tool_product_involvement_fk FOREIGN KEY (id_activity) REFERENCES public.tool_product(id_activity);


--
-- TOC entry 3618 (class 2606 OID 25757)
-- Name: tool_product tool_product_type_tool_product_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.tool_product
    ADD CONSTRAINT tool_product_type_tool_product_fk FOREIGN KEY (tool_product_type_id) REFERENCES public.tool_product_type(tool_product_type_id);


--
-- TOC entry 3532 (class 2606 OID 25762)
-- Name: activity type_activite_activite_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.activity
    ADD CONSTRAINT type_activite_activite_fk FOREIGN KEY (id_type_activity) REFERENCES public.type_activity(id_type_activity);


--
-- TOC entry 3609 (class 2606 OID 25767)
-- Name: sei_lead_consortium_industry type_consortium_socio_economic_interaction_lead_consortium_i423; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.sei_lead_consortium_industry
    ADD CONSTRAINT type_consortium_socio_economic_interaction_lead_consortium_i423 FOREIGN KEY (type_consortium_id) REFERENCES public.type_consortium(type_consortium_id);


--
-- TOC entry 3558 (class 2606 OID 25777)
-- Name: evaluation_thesis type_thesis_project_evaluation_thesis_fk; Type: FK CONSTRAINT; Schema: public; 
--

ALTER TABLE ONLY public.evaluation_thesis
    ADD CONSTRAINT type_thesis_project_evaluation_thesis_fk FOREIGN KEY (type_thesis_id) REFERENCES public.type_thesis(type_thesis_id);


-- Completed on 2022-04-01 14:49:46

--
-- PostgreSQL database dump complete
--

