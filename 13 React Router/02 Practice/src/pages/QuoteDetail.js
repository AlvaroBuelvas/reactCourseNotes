import { Fragment, useEffect } from 'react';

import { useParams, Route, Link, useRouteMatch } from 'react-router-dom'

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments'

import { getSingleQuote } from '../lib/api';
import useHttp from '../hooks/use-http';
import LoadingSpinner from '../components/UI/LoadingSpinner';

// const  DUMMY_QUOTES = [
//     {
//         id: 'q1',
//         author: 'Alvaro',
//         text: 'Inspiration'
//     },
//     {
//         id: 'q2',
//         author: 'Tania',
//         text: 'So Deep'
//     }
// ]

const QuoteDetail = () => {
    const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true)
    const params = useParams();   
    const match = useRouteMatch(); // used to simplify url pattern definition and make it easier in case changes occur

    useEffect(() => {
        sendRequest(params.quoteId);
    }, [sendRequest, params.quoteId])

    if (status === 'pending') {
        return <div className='centered'>
            <LoadingSpinner />
        </div>
    }

    if (error) {
        return <p className='centered focused'>{error}</p>
    }

    if (!loadedQuote.text) {
        return <p className='centered'>No quote found!</p>
    }
    
    return <Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
            <Route path={match.path} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
                </div>
            </Route>            
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
}

export default QuoteDetail;