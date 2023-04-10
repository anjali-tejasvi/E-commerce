import React, {  useState } from 'react'
import { MdLock, MdLockOpen, MdVpnKey } from 'react-icons/md'
import "./UpdatePassword.css"
import { useNavigate } from 'react-router-dom';
import Metadata from '../layout/Header/Metadata'
import {useDispatch, useSelector} from "react-redux"
import { clearErrors,  updatePassword } from '../../actions/userAction';
import {useAlert} from 'react-alert'
import { useEffect } from 'react';
import Loading from '../layout/Loader/Loading'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant';


const UpdatePassword = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  

    const updatePasswordSubmit = (e)=>{
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm))
    }


      useEffect(()=>{

        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
        if (isUpdated) {
          alert.success("Profile Updated Successfully");

    
          navigate("/account");
    
          dispatch({
            type: UPDATE_PASSWORD_RESET,
          });
        }
       
      },[dispatch,navigate,alert,error,isUpdated])
    

  return <>
    {loading ? (
        <Loading />
      ) : (
        <>
          <Metadata title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <MdVpnKey />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <MdLockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <MdLock />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
  </>
}

export default UpdatePassword