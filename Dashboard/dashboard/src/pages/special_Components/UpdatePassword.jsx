import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updatePassword,
} from "@/store/slices/userSlice";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, isAuthenticated, isUpdated, error, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, error, message]);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Password</h1>
              <p className="mb-3">Update Your Password</p>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label>Current Password</Label>
              <Input
                type="text"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>New Password</Label>
              <Input
                type="text"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Confirm Password</Label>
              <Input
                type="text"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              {!loading ? (
                <Button className="w-full" onClick={handleUpdatePassword}>
                  Update Profile
                </Button>
              ) : (
                <SpecialLoadingButton content={"Updating"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
