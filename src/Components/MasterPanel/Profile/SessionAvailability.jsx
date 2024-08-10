import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BiTrash } from 'react-icons/bi';
import '../../../Styles/SessionAvailability.css'; 

const SessionAvailability = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState([]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSaveClick = () => {
        const formattedDate = `${selectedDate.getFullYear()} ${selectedDate.toLocaleString('default', {
            month: 'long',
        })} ${selectedDate.getDate()} ${selectedDate.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        })}`;

        setSelectedDates([...selectedDates, formattedDate]);
        setSelectedDate(new Date());
    };

    const handleDeleteClick = (index) => {
        const updatedDates = [...selectedDates];
        updatedDates.splice(index, 1);
        setSelectedDates(updatedDates);
    };

    const customTimeClass = (date) => {
        return null;
    };

    return (
        <div className="container mt-5">
            <div className="card shadow border-0 rounded p-4">
                <h1 className="text-center mb-4 fs-4">Set Availability Slot</h1>
                <div className="row gap-lg-0 gap-3">
                    <div className='col-lg-5'>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            showTimeSelect
                            dateFormat="Pp"
                            className="form-control pointer"
                            wrapperClassName="date-picker-wrapper"
                            timeClassName={customTimeClass}
                            minDate={new Date()}
                            placeholderText="Select Date and Time"
                            timeIntervals={15}
                            timeCaption="Time"
                            timeFormat="h:mm aa"
                            popperPlacement="top"
                        />
                    </div>
                    <div className='col-lg-5'>
                        <input type="number" className="form-control" placeholder="Enter user slots" />
                    </div>
                    <div className="col-lg-2">
                        <button className="btn btn-success w-100" onClick={handleSaveClick}>
                            Save
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="text-center mb-3 fs-4">Selected Dates and Times:</h3>
                    <ul className="list-group">
                        {selectedDates.map((date, index) => (
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                {date}
                                <button className="btn btn-danger" onClick={() => handleDeleteClick(index)}>
                                    <BiTrash />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SessionAvailability;
