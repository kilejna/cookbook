import React from 'react'
import Flame from '../public/svg/flame.svg'
import MixBowl from '../public/svg/mixingbowl.svg'
import Clock from '../public/svg/clock3.svg'

const SegmentedOverview = ({
    nutrition,
    amounts,
    preptime,
    cooktime,
    description
}) => {
    //map kj of all ingredients to array
    const energy = nutrition.map(n => n.energy);
    //calculate kj of all ingredents based on amounts
    const calculateEnergy = () => {
        const divAmounts = amounts.map((a) => +a / 100); //divide amounts by 100
        const nutritionAmounts = energy.map((n, i) => Math.abs(+n * +divAmounts[i])); //map and multiply both arrays by index
        return (nutritionAmounts.reduce((w, i) => w + i)) //reduce all elements
    };
    //round kj to whole number
    const kj = Math.round(calculateEnergy(energy, amounts));
    //transform kj to kcal and round to whole number
    const kcal = Math.round((calculateEnergy(energy, amounts) / 4.184));
    //calculate hours
    const hours = (time) => {
        return Math.floor(time / 60);
    };
    //calculate mins
    const mins = (time) => {
        return time % 60;
    }
    //calculate total hours
    const totalHours = (prep, cook) => {
        return Math.floor((+prep + +cook) / 60)
    }
    //calculate total mins
    const totalMins = (prep, cook) => {
        return (+prep + +cook) % 60;
    }

    return (
        <div>
            <div className='relative flex flex-row gap-3 my-1 text-center'>
                <div key={'flame'} className='flex flex-col justify-center gap-0.5 px-2 py-2.5 rounded-lg group bg-bblue/80 basis-1/3 lg:basis-1/5'>
                    <Flame className='text-[15vw] place-self-center lg:w-[4.5vw]' fill='#d7eefa' />
                    <span className='text-[3.5vw] text-lblue font-redhat absolute self-center mt-[3.8vw] group-hover:hidden lg:text-[1vw]'>{kcal}</span>
                    <span className='text-[3.5vw] text-lblue font-redhat absolute self-center mt-[3.8vw] mr-[0.6vw] hidden group-hover:inline lg:text-[1vw]'>{kj}</span>
                    <div className='text-[3.2vw] text-lblue leading-tight font-redhat pt-[0.3] lg:text-[1.2vw]'>
                        <span className='group-hover:hidden'>calories</span>
                        <span className='hidden group-hover:inline'>kilojoules</span>
                    </div>
                </div>
                <div key={'whisk'} className='flex flex-col justify-center gap-0.5 px-2 py-2.5 rounded-lg bg-bblue/80 basis-1/3 lg:basis-1/5'>
                    <MixBowl className='text-[15vw] place-self-center lg:w-[4.5vw]' fill='#d7eefa' />
                    <span className='text-[3.2vw] text-lblue font-redhat absolute self-center mt-[2.2vw] mr-[0.6vw] leading-none lg:text-[1vw]'>
                        <p>{hours(preptime)}hr</p>
                        <p>{mins(preptime)}min</p></span>
                    <div className='text-[3.2vw] text-lblue leading-tight font-redhat lg:text-[1.2vw]'>
                        <span className=''>prep time</span>
                    </div>
                </div>
                <div key={'clock'} className='flex flex-col justify-center gap-0.5 px-2 py-2.5 rounded-lg group bg-bblue/80 basis-1/3 lg:basis-1/5'>
                    <Clock className='text-[15vw] place-self-center mt-[1vw] lg:w-[4.5vw]' fill='#d7eefa' />
                    <span className='text-[3.2vw] text-lblue font-redhat absolute self-center mb-[2.6vw] leading-none group-hover:hidden lg:text-[1vw]'>
                        <p>{hours(cooktime)}hr</p>
                        <p>{mins(cooktime)}min</p>
                    </span>
                    <span className='text-[3.2vw] text-lblue font-redhat absolute self-center mb-[2.6vw] leading-none hidden group-hover:inline lg:text-[1vw]'>
                        <p>{totalHours(preptime, cooktime)}hr</p>
                        <p>{totalMins(preptime, cooktime)}min</p>
                    </span>
                    <div className='text-[3.2vw] text-lblue leading-tight font-redhat lg:text-[1.2vw]'>
                        <span className='group-hover:hidden'>cook time</span>
                        <span className='hidden group-hover:inline'>total time</span>
                    </div>
                </div>
                <div className='hidden basis-1/5 bg-bblue/80 lg:visible'>
                    
                </div>
                <div className='hidden basis-1/5 bg-bblue/80 lg:visible'></div>
            </div>
            <div className='m-2 text-onyx text-[0.8rem] font-redhat lg:text-[0.8rem]'>
                {description}
            </div>
        </div>
    )
}

export default SegmentedOverview