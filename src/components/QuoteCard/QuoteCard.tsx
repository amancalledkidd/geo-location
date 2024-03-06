import { useEffect, useState } from 'react';
import './QuoteCard.scss';
import { Quote } from '../../types/Quote';

const QuoteCard = () => {
    const [quote, setQuote] = useState<Quote>();

    useEffect(() => {
        fetchQuote();
    }, []);

    const fetchQuote = async () => {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes/', {
            headers: {
                'X-Api-Key': import.meta.env.VITE_NINJA_TOKEN
            }
        });
        const data = await response.json();
        if (data && data.length > 0) {
            setQuote(data[0]);
        }
    };

    return (
        <div className="quote-card">
            <h1 className="quote-card__quote">"{quote?.quote}"</h1>
            <p className="quote-card__author">- {quote?.author}</p>
        </div>
    );
};

export default QuoteCard;
