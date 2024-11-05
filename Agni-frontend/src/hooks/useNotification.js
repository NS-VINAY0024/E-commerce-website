// hooks/useNotification.js
import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

const useNotification = () => {
    const { addNotification, clearNotification } = useContext(NotificationContext);

    return {
        addNotification,
        clearNotification
    };
};

export default useNotification;
