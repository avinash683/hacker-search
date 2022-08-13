import React, {useEffect} from "react";
import { useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getSelectedBlogAction} from "../../store/actions/config";
import { CssBaseline, Divider, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import Comments from "./Comments";
import Loader from "../Loader";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // padding:theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    section1: {
        margin: theme.spacing(2),
    },
    section2: {
        margin: theme.spacing(2),
    },
    section3: {
        margin: theme.spacing(3, 1, 1),
    },
}));
function HackerView(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();
    const isLoading = useSelector(state => state.configs.loading);

    useEffect(() => {
        dispatch(getSelectedBlogAction(id));
    }, [id]);

    const blogDetails = useSelector((state) => state.configs.blogDetails);
    return <div>
        <CssBaseline/>
        <br/>
        {isLoading
            ? <Loader/>
            : <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
            >
                <Grid item xs>
                    <div className={classes.root}>
                        <div className={classes.section1}>
                            <Grid container alignItems="center">
                                <Grid item xs>
                                    <Typography gutterBottom variant="body2">
                                        {moment(blogDetails.created_at).fromNow()}
                                    </Typography>
                                    <Typography gutterBottom variant="h4">
                                        {blogDetails.title}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                        <Divider variant="middle" />
                        <div className={classes.section2}>
                            { blogDetails?.points &&
                                <>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon fontSize="small" color="error" style={{verticalAlign:"bottom"}}/>
                                    </IconButton>
                                    {blogDetails.points} Likes {" "}
                                </>
                            }
                            { blogDetails?.num_comments &&
                                <>
                                    <IconButton aria-label="share">
                                        <CommentIcon fontSize="small" style={{verticalAlign:"bottom"}}/>
                                    </IconButton>
                                    {blogDetails.num_comments} Comments{" "}
                                </>
                            }
                        </div>
                    </div>
                    <br/>
                    {blogDetails?.children && blogDetails.children.map((item, index) => <Comments key={index} {...item} />)}
                </Grid>

            </Grid>}
    </div>
}

export default HackerView;