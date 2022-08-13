/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useDispatch, useSelector} from "react-redux";
import { ListItem, ListItemText, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import {makeStyles} from "@material-ui/core/styles";
import FavoriteIcon from '@material-ui/icons/Favorite';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CommentIcon from '@material-ui/icons/Comment';
import moment from "moment";
import {getSelectedBlogAction} from "../../store/actions/config";
import {useHistory} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        width: "100%",
    },
    iconButton: {
        padding: 10,
    },
    searchInput: {
        [theme.breakpoints.up("lg")]: {
            width: 500,
        },
        [theme.breakpoints.down("md")]: {
            width: 'auto',
        },
    },
}));

export default function AutocompleteSearch(props) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const searchResults = useSelector((state) => state.configs.recentSearch);
    const {searchQuery, setSearchQuery} = props
    const handleView = (oneDetail) => {
        dispatch(getSelectedBlogAction(oneDetail.objectID))
        history.push(`/news/${oneDetail.title}/${oneDetail.objectID}`);
    }
    return (
        <div className={classes.searchInput}>
            <Autocomplete
                size="small"
                id="free-solo-demo"
                freeSolo
                selectOnFocus
                clearOnBlur
                clearOnEscape
                options={searchResults}
                getOptionLabel={(option) => `${option.title}`}
                renderOption={(oneDetail, index) => <ListItem
                    onClick={()=> handleView(oneDetail)}>
                    <ListItemText primary={<Typography variant="body1" >
                        <b>{oneDetail.title ? oneDetail.title : oneDetail.story_text}</b>
                    </Typography>}
                                  secondary={<React.Fragment>
                                      <Typography
                                          component="span"
                                          variant="body2"
                                          className={classes.inline}
                                          color="textPrimary"
                                      >
                                          {oneDetail.author}
                                      </Typography>
                                      {` — ${oneDetail.url}`}
                                      <Typography>
                                          <FavoriteIcon fontSize="small" color="error" style={{verticalAlign:"bottom"}}/> {oneDetail.points} {" "}
                                           <CommentIcon fontSize="small" style={{verticalAlign:"bottom"}}/> {oneDetail.num_comments}{" "}
                                          <DateRangeIcon fontSize="small" style={{verticalAlign:"bottom"}}/> {moment(oneDetail.created_at_i).fromNow(true)}
                                      </Typography>
                                  </React.Fragment>
                                  }/>

                </ListItem>
                }
                renderInput={(params) => {
                    const {InputLabelProps, InputProps, ...rest} = params;
                    return <Paper component="form" className={classes.root} elevation={0} variant="outlined">
                        <IconButton className={classes.iconButton} aria-label="search">
                            <SearchIcon/>
                        </IconButton>
                        <InputBase color="secondary"
                                   onChange={(e) => setSearchQuery(e.target.value)}
                                   placeholder={"Search hacker news title ... "}
                                   value={searchQuery}
                                   {...params.InputProps}
                                   {...rest}
                        />
                    </Paper>

                }}
            />
        </div>
    );
}