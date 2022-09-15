// import { csrfFetch } from "./csrf";
// import { updateImage } from "./spots";

// export const UpdateImageThunk = (spotId,imageId,url) => async (dispatch) => {
//     const deleteRes = await csrfFetch(`/api/images/${imageId}`, {
//       method: 'DELETE',
//       headers:{
//         "Content-Type": "application/json"
//       }
//     })
//     let response;
//     if (deleteRes.ok){
//       response = await csrfFetch(`/api/spots/${spotId}/images`, {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({url,previewImage:true})
//     })
//     if (response.ok){
//       const newImage = await response.json()
//     //   console.log('newImage----', newImage)
//       dispatch(updateImage(newImage, spotId)) //from spots store
//     }
//   }
//   }