import './JournalCard.scss'
import { useState, ChangeEvent } from 'react'


const JournalCard = () => {
    const [entry, setEntry] = useState<string>('')
    const [edit, setEdit] = useState<boolean>(true)

    const editJournalClick = () => {
        console.log('Journal entry submitted')
        setEdit(!edit)
    }
    const handleEntryChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setEntry(e.target.value)
    }

    return (
        <div className="journal-card">
            <h4 className='journal-card__title'>Journal</h4>
            <textarea
                className="journal-card__entry"
                value={entry}
                placeholder="Today's entry" 
                onChange={handleEntryChange}
                disabled={!edit} 
                />
            {!edit ? <button className="journal-card__edit" onClick={editJournalClick}>Edit</button> : 
            <button className="journal-card__submit"  onClick={editJournalClick}>Submit</button>
            }   


        </div>
    )
}

export default JournalCard

