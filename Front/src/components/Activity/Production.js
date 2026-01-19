import React from 'react';
import './Production.css';

function Production() {
    const [chercheur, setChercheur] = React.useState("");
    const [type_outil, setType_outil] = React.useState("");
    const [nom_outil, setNom_outil] = React.useState("");
    const [auteurs, setAuteurs] = React.useState("");
    const [date, setDate] = React.useState("");
    const [description, setDescritption] = React.useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
    }

    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
                <a href="/Activity" class="close-button">&#10006;</a>
                <h3 className='title'>Production</h3>
                <label className='label'>
                    Researcher
                </label>
                <input
                    placeholder='Nom'
                    className='input-container'
                    name="chercheur"
                    type="chercheur"
                    value={chercheur}
                    onChange={e => setChercheur(e.target.value)}
                    required/>

                <label className='label'>
                    Type d'outil
                </label>
                <input
                    placeholder="Type d'outil"
                    className='input-container'
                    name="type_outil"
                    type="type_outil"
                    value={type_outil}
                    onChange={e => setType_outil(e.target.value)}
                    required/>

                <label className='label'>
                    Nom d'outil de production
                </label>
                <input
                    placeholder="Nom d'outil de production"
                    className='input-container'
                    name="nom_outil"
                    type="nom_outil"
                    value={nom_outil}
                    onChange={e => setNom_outil(e.target.value)}
                    required/>

                <label className='label'>
                    Date d'obtention
                </label>
                <DatePicker
                    className='datePicker'
                    selected={date}
                    onChange={date => setDate(date)}
                    withPortal
                    placeholderText="Choix de date"/>

                <label className='label'>
                    Auteurs
                </label>
                <input
                    placeholder="Auteurs"
                    className='input-container'
                    name="auteurs"
                    type="auteurs"
                    value={auteurs}
                    onChange={e => setAuteurs(e.target.value)}
                    required/>

                <label className='label'>
                    Description
                </label>
                <textarea
                    placeholder='Description'
                    className='textarea'
                    name="description"
                    type="description"
                    value={description}
                    onChange={e => setDescritption(e.target.value)}
                    required/>

                <button className='submit'>Valider</button>
            </form>
        </div>
    );
}

export default Production;