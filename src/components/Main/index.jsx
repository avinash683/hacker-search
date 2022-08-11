import React, {useEffect, useState} from 'react';
import {alpha, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import hackerLogo from '../../assets/hacker_logo.png'
import {getRecentSearchAction} from "../../store/actions/config";
import {useDispatch, useSelector} from "react-redux";
import AutocompleteSearch from "../AutocompleteSearch";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function Main(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {theme, setTheme, icon} = props
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        dispatch(getRecentSearchAction(searchQuery));
    }, []);

    return (
        <div className={classes.grow}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <img
                            src={hackerLogo}
                            style={{
                                maxWidth: "91%",
                                maxHeight: "40px",
                                filter: "drop-shadow(0px 0px 1px #2394c4)",
                            }}
                        />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Hacker Search
                    </Typography>
                    <div className={classes.search}>
                        <AutocompleteSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                    </div>
                    <div className={classes.grow}/>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="mode"
                        onClick={() => setTheme(!theme)}
                    >
                        {icon}
                    </IconButton>
                </Toolbar>
            </AppBar>

        </div>
    );
}

export default Main