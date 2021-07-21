import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from "next/link";
import AuthService from "../auth/auth.service";

const TopBar = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        setCurrentUser(user)
    }, [])
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="topbar-one">
            <div className="container">
                <div className="topbar-one__left">
                    <a href="#">learning@gmail.com</a>
                    <a href="#">444 888 0000</a>
                </div>
                <div className="topbar-one__right">
                    {currentUser ? <a onClick={AuthService.logout}>{currentUser?.username}</a> :
                        <Link href="/login"><a href="#">Login</a></Link>
                    }

                    <a onClick={handleClickOpen} color="primary">Register</a>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Login</DialogTitle>
                        <DialogContent>
                            <DialogContentText>

                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="User Name"
                                type="email"
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Password"
                                type="password"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleClose} color="primary">
                                Subscribe
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
