import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../../../actions';
import './updateLog.scss';
import SlideText from '../../../components/slideText';

const UpdateLogContainer = () => {
    const [textLogToDisplay, setTextLogToDisplay] = useState();
    const updateLogs = useSelector(state => state.updateLogReducer.updateLogs);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(updateLogs);
        if (updateLogs.length === 0) {
            dispatch(actions.updateLogActions.getCovidUpdateLog());
        }
    }, []);

    useEffect(() => {
        let isCancelled = false;
        for (let i = 0; i < updateLogs.length; i += 1) {
            // eslint-disable-next-line no-loop-func
            setTimeout(() => {
                const date_ob = updateLogs[i].timestamp;
                // year as 4 digits (YYYY)
                const year = date_ob.getFullYear();

                // month as 2 digits (MM)
                const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

                // date as 2 digits (DD)
                const date = ("0" + date_ob.getDate()).slice(-2);

                // hours as 2 digits (hh)
                const hours = ("0" + date_ob.getHours()).slice(-2);

                // minutes as 2 digits (mm)
                const minutes = ("0" + date_ob.getMinutes()).slice(-2);

                // seconds as 2 digits (ss)
                const seconds = ("0" + date_ob.getSeconds()).slice(-2);
                if (!isCancelled) {
                    setTextLogToDisplay(updateLogs[i].update.concat(' DateTime ', year, '-', month, '-', date, ' ', hours, ':', minutes, ':', seconds));
                }
            }, 10000 * i)
        }
        return () => {
            isCancelled = true;
        };
    }, [updateLogs.length]);

    return (
        <div className="update-log-container">
            <SlideText textToShow={textLogToDisplay} />
        </div>
    );
}

export default UpdateLogContainer;