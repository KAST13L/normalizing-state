import React, {useState} from 'react';

interface CardType {
    id: number
    order: number
    title: string
}

export const DragAndDrop = () => {

    const [cardList, setCardList] = useState<CardType[]>([
        {id: 1, order: 5, title: 'I'},
        {id: 2, order: 2, title: 'II'},
        {id: 3, order: 4, title: 'III'},
        {id: 4, order: 3, title: 'IV'},
        {id: 5, order: 1, title: 'V'}
    ])
    const [currentCard, setCurrentCard] = useState<CardType | any>(null)

    function onDragStartHandler(e: React.DragEvent<HTMLDivElement>, card: { id: number; title: string; order: number }) {
        setCurrentCard(card)
    }

    function onDragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.background = 'gray'
    }

    function onDragEndHandler(e: React.DragEvent<HTMLDivElement>) {

    }

    function onDragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        e.currentTarget.style.background = 'lightgray'
    }

    function onDropHandler(e: React.DragEvent<HTMLDivElement>, card: CardType) {
        e.preventDefault()
        setCardList(cardList.map( c => {
            if (c.id === card.id) {
                return {...c, order: currentCard.order}
            }
            if (c.id === currentCard?.id) {
                return {...c, order: card.order}
            }
            return c
        }))
        e.currentTarget.style.background = 'gray'
    }

    function sortCards (a: CardType, b: CardType) {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    return (
        <div className={'app'}>
            {cardList.sort(sortCards).map(card => <div
                className={'card'}
                key={card.id}
                draggable
                onDragStart={(e) => onDragStartHandler(e, card)}
                onDragLeave={(e) => onDragLeaveHandler(e)}
                onDragEnd={(e) => onDragEndHandler(e)}
                onDragOver={(e) => onDragOverHandler(e)}
                onDrop={(e) => onDropHandler(e, card)}
            >{card.title}</div>)}
        </div>
    );
};

