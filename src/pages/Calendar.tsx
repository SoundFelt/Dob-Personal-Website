import { useState } from 'react'
import { CTAButton } from '../components/Navbar';
import { CALENDAR_DATES } from '../data.ts'; 
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';
import { TbPoint } from "react-icons/tb";
import { SlMusicTone } from "react-icons/sl";
import Dob1 from '../assets/dob1.jpg';
import Dob2 from '../assets/dob2.jpg';
import { TiArrowDown, TiArrowUp } from "react-icons/ti";
import { useWindowSize } from '../hooks/useWindowSize.js';

const Calendar = () => {
    const [viewAll, setViewAll] = useState(false);

    const upcoming = CALENDAR_DATES.filter(event => moment(event.date, 'MM/DD/YY').isAfter(moment()))
        .sort((a, b) => moment(a.date, 'MM/DD/YY').valueOf() - moment(b.date, 'MM/DD/YY').valueOf());

    const allDates = CALENDAR_DATES.sort((a, b) => moment(a.date, 'MM/DD/YY').valueOf() - moment(b.date, 'MM/DD/YY').valueOf());

    const windowSize = useWindowSize();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '100%', padding: windowSize.width < 800 ? '0 20px' : '0 50px', marginTop: windowSize.width > 800 ? '150px' : '50px', marginBottom: '50px' }}>
        {windowSize.width <= 800 && (
            <div style={{ marginBottom: '75px'}}>
                <img src={Dob2} style={{ boxShadow: '1.7px 3.4px 3.4px hsl(0deg 0% 0% / 0.45)', width: '100%', top: 0, borderRadius: '10px', opacity: 0.9 }} />
            </div>
        )}
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', position: 'relative' }}>
            <span
                style={{
                    fontSize: '40px',
                    fontWeight: '400',
                    bottom: '-5px',
                    position: 'absolute',
                    letterSpacing: '-2px',
                    left: 0
                }}
            >
                Performances
            </span>
        </div>
        <div style={{ width: '100%', height: '0.5px', backgroundColor: 'rgb(70, 70, 70)', margin: '0 0 25px'}}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxHeight: windowSize.width < 800 ? '' : '730px' }}>
            <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', maxHeight: windowSize.width < 800 ? '' : '730px' }}>
                    <PastPerformancesButton onClick={() => setViewAll(!viewAll)}>
                        {viewAll ? <TiArrowDown style={{ fontSize: '22px', marginRight: '2px' }} /> : <TiArrowUp style={{ fontSize: '22px', marginRight: '2px' }}/> }
                        <span style={{ fontSize: '14px' }}>
                            {`${viewAll ? 'Hide' : 'View'} past performances`}
                        </span>
                    </PastPerformancesButton>
                    <div style={{ display: 'flex', width: '100%', flexDirection: 'column', overflowY: 'auto', height: '100%'}}>
                        {(viewAll ? allDates : upcoming).map(event => {
                            const firstUpcoming = viewAll ? allDates?.find(event => moment(event.date, 'MM/DD/YY').isAfter(moment()))?.date === event.date : null;
                            const lastPast = viewAll ? allDates.filter(event => moment(event.date, 'MM/DD/YY').isBefore(moment()))
                                .sort((a, b) => moment(a.date).isBefore(moment(b.date)) ? 1 : -1)[0].date === event.date : null;

                            const isPast = moment(event.date, 'MM/DD/YY').isBefore(moment());
                            return (
                                <>
                                    { firstUpcoming && (
                                        <>
                                            <span
                                                style={{
                                                    fontSize: '26px',
                                                    fontWeight: '300',
                                                    letterSpacing: '-1px',
                                                    marginTop: '50px',
                                                    left: 0
                                                }}
                                            >
                                                Upcoming
                                            </span>
                                            <div style={{ width: '100%', minHeight: '0.5px', backgroundColor: 'rgb(70, 70, 70)', margin: '0 0 40px'}}/>
                                        </>
                                    )}
                                    <div style={{ paddingRight: '15px', display: 'flex', flexDirection: windowSize.width < 1400 ? 'column' : 'row', color: isPast ? 'rgb(180, 180, 180)' : '', minWidth: windowSize.width < 1000 ?  '350px' : windowSize.width < 1400 ? '500px' : '900px'}}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between',  flexDirection: ((windowSize.width < 1000 && windowSize.width > 800) || windowSize.width < 500) ? 'column' : 'row' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', width: windowSize.width < 1400 ? '' : '250px', marginRight: '30px' }}>
                                                <span style={{ fontWeight: '500', fontSize: '22px'}}>{moment(event.date).format('Do MMMM YY')}</span>
                                                <span style={{ fontWeight: '300', fontSize: '16px', marginBottom: windowSize.width < 1400 ? '20px' : '' }}>{moment(event.time, "HH:mm").format('HH:mma')}</span>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', minWidth: windowSize.width < 1400 ? '' : '250px', marginRight: windowSize.width < 1400 ? '5px' : '30px', marginBottom: windowSize.width < 1400 ? '20px' : '' }}>
                                                <span style={{ fontSize: '22px', fontWeight: '500' }}>{event.location}</span>
                                                <span style={{ fontSize: '16px', fontWeight: '300', }}>{event.at}</span>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '175px', maxWidth: windowSize.width < 1400 ? '' : '250px', marginRight: '30px', }}>
                                            <span style={{ fontSize: '22px', fontWeight: '500', marginBottom: '3px' }}>{event.name}</span>
                                            { event.repertoire.map(piece => {
                                                return (
                                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2px', marginLeft: '-5px' }}>
                                                        <TbPoint style={{ fontSize: '20px', minWidth: '20px', color: isPast ? 'rgb(180,180,180)' : 'rgb(50, 50, 50)', marginRight: '10px', paddingTop: '2px'}}/>
                                                        <span style={{ fontWeight: '300', fontSize: '16px'}}>{piece}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        { moment(event.date).isAfter(moment()) && (
                                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: windowSize.width < 1000 ? 0 : 'auto', marginRight: '5px', marginTop: windowSize.width < 1400 ? '15px' : 0}}>
                                                {event.link ? (
                                                    <Link style={{ textDecoration: 'none', color: 'black' }} to={event.link} target="_blank" rel="noopener noreferrer">
                                                        <CTAButton style={{ width: '120px', height: '20px', paddingTop: '6px', fontWeight: '400', display: 'flex', fontSize: '15px', justifyContent: 'center' }}>
                                                            Book tickets
                                                            <SlMusicTone style={{ marginLeft: '5px', fontSize: '14px'}}/>
                                                        </CTAButton>
                                                    </Link>
                                                ) : (
                                                    <span style={{ whiteSpace: 'nowrap', marginLeft: windowSize.width < 1400 ? '' : '15px', fontSize: '13px', color: 'rgb(180,180,180)'}}>Tickets not yet available</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {!lastPast && <div style={{ width: '100%', minHeight: '0.5px', backgroundColor: 'rgb(200, 200, 200)', margin: windowSize.width < 1400 ? '20px auto' : '40px auto'}}/> }
                                </>
                            )
                        })}
                    </div>
                    <span style={{ textAlign: 'center', color: 'rgb(150, 150, 150)', margin: windowSize.width < 800 ? '15px 0 0' : '50px 0 0', fontSize: '20px', fontWeight: '200' }}>More performance dates coming soon</span>
                </div>
            </div>
            { windowSize.width > 800 && (
                <div style={{ objectFit: 'contain', position: 'relative', maxWidth: '500px', marginLeft: '50px'}}>
                    <img src={Dob1} style={{ boxShadow: '1.7px 3.4px 3.4px hsl(0deg 0% 0% / 0.45)', width: '100%', top: 0, borderRadius: '10px', opacity: 0.6}}/>
                </div>
            )}
        </div>
    </div>
  )
}

const PastPerformancesButton = styled.div`
    display: flex;
    color: rgb(150,150,150);
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
        color: rgb(50,50,50);
    }
`

export default Calendar