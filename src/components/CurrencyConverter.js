import React from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
    const [convertedAmount, setConvertedAmount] = React.useState(0);
    const [result, setResult] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const amountInputRef = React.useRef(null);
    const toInputRef = React.useRef(null);
    const fromInputRef = React.useRef(null);

    const currenciesFrom = ['NGN', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF'];
    const currenciesTo = ['USD', 'NGN', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF'];

    const myHeaders = new Headers();
    myHeaders.append("apikey", process.env.REACT_APP_APILAYER_API_KEY);

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    const currencyConverter = () => {
        const enteredAmount = amountInputRef.current.value;
        const enteredFromCurrency = fromInputRef.current.value;
        const enteredToCurrency = toInputRef.current.value;

        setLoading(true);
        fetch
            (`https://api.apilayer.com/currency_data/convert?to=${enteredToCurrency}&from=${enteredFromCurrency}&amount=${enteredAmount}`,
                requestOptions)
            .then(response => response.json())
            .then(result => {
                setConvertedAmount(result.result.toFixed(2));
                setResult(result);
                setLoading(false);
            })
            .catch(error => {
                alert(`${error.message} Please try again later.`);
                setError(true);
                setLoading(false);
            });

    };

    return (
        <section className='Currency-converter'>
            <div>
                <div className='Currency-header'>
                    <p className='Currency-header-rate'>Exchange Rate</p>
                    <p className='Currency-header-rate-amount'>{result ? `${convertedAmount} ${result.query.to}` : '0 USD'}</p>
                </div>

                <div className='Currency-amount'>
                    <label htmlFor='amount' className='Currency-labels' >Amount</label>
                    <input type="number" id='amount' ref={amountInputRef} />
                </div>

                <div className='Currency-exchange'>
                    <div className='Currency-from'>
                        <label className='Currency-labels'>From</label>
                        <select ref={fromInputRef}>
                            {currenciesFrom.map(currency => <option key={currency} value={currency}>{currency}</option>)}
                        </select>
                    </div>

                    <div className='Currency-rate'>
                        <FaExchangeAlt size={30} />
                    </div>

                    <div className='Currency-to'>
                        <label className='Currency-labels'>To</label>
                        <select ref={toInputRef}>
                            {currenciesTo.map(currency => <option key={currency} value={currency}>{currency}</option>)}
                        </select>
                    </div>
                </div>

                <div className='Currency-btn' onClick={currencyConverter}>
                    {loading && !error ? 'Converting...' : 'Convert'}
                </div>

            </div>
        </section>
    )
}

export default CurrencyConverter;
