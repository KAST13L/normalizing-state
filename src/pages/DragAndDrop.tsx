import React, {useState} from 'react';

export const DragAndDrop = () => {

    const [cardList, setCardList] = useState([
        {id:1, order: 1, title:'Card One'},
        {id:2, order: 2, title:'Card Two'},
        {id:3, order: 4, title:'Card Three'},
        {id:4, order: 3, title:'Card Four'}
    ])

    return (
        <div className={'app'}>
            {cardList.map(card => <div
                className={'card'}
                key={card.id}
                draggable
            >{card.title}</div>)}
        </div>
    );
};

