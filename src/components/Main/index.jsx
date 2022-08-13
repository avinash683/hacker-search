import React, {useEffect, useState} from 'react';
import {alpha, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import hackerLogo from '../../assets/hacker_logo.png'
import {getRecentSearchAction} from "../../store/actions/config";
import {useDispatch} from "react-redux";
import {BrowserRouter, Redirect, Route, Switch, useHistory, useLocation, withRouter} from 'react-router-dom';
import {Box, Container, Grid} from "@material-ui/core";
import HackerDashboard from "../HackerDashboard";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import HackerView from "../HackerView";
import AutocompleteSearch from "../AutocompleteSearch";
import {Dashboard} from "@material-ui/icons";

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
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    containerPaddding: {
        [theme.breakpoints.down("md")]: {
          padding: theme.spacing(2),
        },
    },
    toolbar: theme.mixins.toolbar,
}));

function Main(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {theme, setTheme, icon} = props
    const history = useHistory();
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        dispatch(getRecentSearchAction(searchQuery));
    }, [searchQuery]);

    return (
        <div className={classes.grow}>
            <AppBar position="fixed" color="default">
                <Container maxWidth="lg" className={classes.containerPaddding}>
                <Toolbar disableGutters>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => {
                            history.push("/search", <HackerDashboard/>);
                            // window.location.reload();
                        }}>
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
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={"Search hacker news ... "}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                    </div>
                    {/*<AutocompleteSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>*/}
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
                </Container>
            </AppBar>
            <Container maxWidth="lg" className={classes.containerPaddding}>
                <Toolbar/>
                {searchQuery
                    ?  <HackerDashboard setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>
                    :  <Box >
                        <Box p={1} flexGrow={1}>
                            <div>
                                <BrowserRouter>
                                    <Switch>
                                        <Redirect exact from="/" to="/search" />
                                        <Route path="/search">
                                            <HackerDashboard/>
                                        </Route>
                                        <Route path="/news/:title/:id">
                                            <HackerView/>
                                        </Route>
                                    </Switch>
                                </BrowserRouter>
                            </div>
                        </Box>
                    </Box>
                }

            </Container>

        </div>
    );
}

export default withRouter(Main);
