import React, {  useState } from 'react'
import { MdLock, MdLockOpen } from 'react-icons/md'
import "./ResetPassword.css"
import { useNavigate, useParams } from 'react-router-dom';
import Metadata from '../layout/Header/Metadata'
import {useDispatch, useSelector} from "react-redux"
import { clearErrors, resetPassword,  } from '../../actions/userAction';
import {useAlert} from 'react-alert'
import { useEffect } from 'react';
import Loading from '../layout/Loader/Loading'

const ResetPassword = () => {
  const {token} = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { error, success, loading } = useSelector(
      (state) => state.forgotPassword
    );
  
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const resetPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);
  
      dispatch(resetPassword(token, myForm));
    };
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (success) {
        alert.success("Password Updated Successfully");
  
        navigate("/login");
      }
    }, [dispatch, error, alert,navigate , success,token]);
  
  
  return <>
    {loading ? (
        <Loading />
      ) : (
        <>
          <Metadata title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <MdLockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
  </>
}


export default ResetPassword;