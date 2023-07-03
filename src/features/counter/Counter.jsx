import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, reset, incrementByAmount } from './counterSlice'
import { useState } from 'react'

const Counter = () => {
    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch()
    const [incrementAmount, setIncrementAmount] = useState(0)
    const addValue = Number(incrementAmount) || 0
    const resetAll = () => {
        setIncrementAmount(0)
        dispatch(reset())
    }
    return (
        <section className='flex flex-col items-center justify-center my-5'>
            <div className="inline-flex items-center gap-4">
                <button onClick={() => dispatch(increment())} className='px-4 py-2 text-base text-white bg-indigo-500 rounded-2xl'>
                    +
                </button>
                <p>
                    {count}
                </p>
                <button onClick={() => dispatch(decrement())} className='px-4 py-2 text-base text-white bg-indigo-500 rounded-2xl'>
                    -
                </button>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
                <label htmlFor="inputAmount">Insert Amount</label>
                <input type="number" value={incrementAmount} onChange={(e) => setIncrementAmount(e.target.value)} className='px-6 py-3 rounded-lg bg-slate-300' name="" id="" />
            </div>
            <div className="inline-flex items-center gap-4 mt-5">
                <button className='px-4 py-2 text-base text-white bg-indigo-500 rounded-2xl' onClick={() => dispatch(incrementByAmount(addValue))}>
                    Add Amount
                </button>
                <button className='px-4 py-2 text-base text-white bg-rose-500 rounded-2xl' onClick={resetAll}>
                    Reset
                </button>
            </div>
        </section>
    )
}

export default Counter