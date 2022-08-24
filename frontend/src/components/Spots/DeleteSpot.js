// import {useDispatch} from 'react-redux';
// import {useHistory} from 'react-router-dom';
// import {DeleteSpotThunk} from '../../../store/spots';
// import { useSelector } from 'react-redux';

// export default function DeleteSpot({spot}) {
//     console.log({spot})
//     const user = useSelector(state => state.session.user);
//     const history = useHistory(); 
//     const dispatch = useDispatch();

//         async function onDelete(spot) {
//          dispatch(DeleteSpotThunk(spot,history))
        
//     }

//     if(user.id === spot.userId){
//         return (
//             <button type="button" onClick={() => onDelete(spot.id)}> Delete Spot</button>
//         )
//     }
// }