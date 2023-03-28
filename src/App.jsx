import React, { useState } from "react";
import Card from "./components/Card.jsx";
import History from "./components/History.jsx";
import "./App.css";

function App() {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [category, setCategory] = useState("");
    const [cards, setCards] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        if (!name || !link || !category) {
            alert("Please fill in all fields");
            return;
        }
        const newCard = { name, link, category };
        setCards([...cards, newCard]);
        setShowForm(false);
        setName("");
        setLink("");
        setCategory("");
    }

    function handleCardUpdate(index, updatedCard) {
        const updatedCards = [...cards];
        updatedCards[index] = updatedCard;
        setCards(updatedCards);
    }

    function handleCardDelete(index) {
        const updatedCards = [...cards];
        updatedCards.splice(index, 1);
        setCards(updatedCards);
    }

    const categories = [...new Set(cards.map((card) => card.category))];

    const history = () => {
        setShowHistory(true);
    };

    return ( <
        div className = "container" >
        <
        h1 className = "title" > The Basic App < /h1>{" "} <
        div className = "button-group" >
        <
        button className = "add-button btn btn-danger"
        onClick = {
            () => setShowForm(true) } >
        { " " }
        New Card { " " } <
        /button>{" "} <
        button className = "history-button btn"
        onClick = { history } > { " " }
        History { " " } <
        /button>{" "} <
        /div>{" "} {
            showForm && ( <
                form onSubmit = { handleSubmit }
                className = "form" >
                <
                div className = "form-field" >
                <
                input className = "form-input"
                type = "text"
                placeholder = "Name Of The Video"
                value = { name }
                onChange = {
                    (event) => setName(event.target.value) }
                required /
                > { " " } <
                /div>{" "} <
                div className = "form-field" >
                <
                input className = "form-input"
                type = "text"
                placeholder = "Please Paste Link Here"
                value = { link }
                onChange = {
                    (event) => setLink(event.target.value) }
                required /
                >
                <
                /div>{" "} <
                div className = "form-field" >
                <
                select className = "form-input category"
                value = { category }
                onChange = {
                    (event) => setCategory(event.target.value) }
                required >
                <
                option value = "" > Choose a category < /option>{" "} <
                option value = "entertainment" > Entertainment < /option>{" "} <
                option value = "sports" > Sports < /option>{" "} <
                option value = "music" > Music < /option>{" "} <
                option value = "educational" > Educational < /option>{" "} <
                option value = "others" > Others < /option>{" "} <
                /select>{" "} <
                /div>{" "} <
                button className = "submit-button btn"
                type = "submit" > { " " }
                Add Card { " " } <
                /button>{" "} <
                /form>
            )
        } { " " } {
            categories.map((category) => ( <
                div key = { category } >
                <
                h2 > { " " } { category.charAt(0).toUpperCase() + category.slice(1) }
                Videos { " " } <
                /h2>{" "} <
                div className = "cards-container" > { " " } {
                    cards.map(
                        (card, index) =>
                        card.category === category && ( <
                            Card key = { index }
                            index = { index }
                            name = { card.name }
                            link = { card.link }
                            onUpdate = { handleCardUpdate }
                            onDelete = { handleCardDelete }
                            />
                        )
                    )
                } { " " } <
                /div>{" "} <
                /div>
            ))
        } { " " } {
            showHistory && ( <
                History cards = { cards }
                onClose = {
                    () => setShowHistory(false) }
                />
            )
        } { " " } <
        /div>
    );
}

export default App;