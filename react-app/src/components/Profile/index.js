import {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getUserVenuesThunk} from '../../store/gotos'


function Profile() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userPlaces = useSelector((state) => Object.values(state.gotos));

    useEffect(() => {
        dispatch(getUserVenuesThunk(sessionUser.id))
    }, [])

    return (
        <>
    <div className="place-name">
        {sessionUser.username}
            </div>
            <div>


            </div>
    </>
    )

}

export default Profile;
