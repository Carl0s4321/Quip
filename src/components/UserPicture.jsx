import { avatar } from "../lib/appwrite";
import React, { useState, useEffect } from 'react';
import useUserStore from "../store/userStore";

const UserPicture = () => {
    const [avatarUrl, setAvatarUrl] = useState('');
    const {user} = useUserStore();

    useEffect(() => {
        if (user) {
          const fetchAvatar = async () => {
            try {
              const result = avatar.getInitials(user.name);
              setAvatarUrl(result);
            } catch (error) {
              console.error('Failed to fetch avatar', error);
            }
          };
          fetchAvatar();
        }
      }, [user]);

    return(
            <img src={avatarUrl} alt={'avatar'} className="rounded-full" />
        // <div className="">
        // </div>
    )
}
export default UserPicture;