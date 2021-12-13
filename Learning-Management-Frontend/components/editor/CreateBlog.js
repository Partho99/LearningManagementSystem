import React, {useEffect, useState} from 'react';
import 'react-quill/dist/quill.snow.css'
import dynamic from "next/dynamic";
import Button from "@material-ui/core/Button";
import Select from 'react-select'
import {Form, useFormik} from "formik";
import {makeStyles} from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import {Image} from "@material-ui/icons";
import {TextField} from "@material-ui/core";
import HashLoader from "react-spinners/HashLoader";

const ReactQuill = dynamic(() => import('react-quill').then(), {
    ssr: false, loading: () => <div className='spinner_area'>
        <div className='container text-center'>
            <HashLoader size={70} color={'#9934eb'}/>
        </div>
    </div>
});

const colourStyles = {
    option: (styles, {isFocused, isSelected}) => ({
        ...styles,
        background: isFocused
            ? 'hsla(291, 64%, 42%, 0.5)'
            : isSelected
                ? 'hsla(291, 64%, 42%, 1)'
                : undefined,
        zIndex: 1
    }),
    menu: base => ({
        ...base,
        zIndex: 100,
    }),
    control: base => ({
        ...base,
        height: 53,
        minHeight: 35
    })
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: 50,
        transform: 'translateZ(0px)',
        flexGrow: 1,
    },
    speedDial: {
        position: 'relative',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const actions = [
    {icon: <FileCopyIcon/>, name: 'Copy'},
    {icon: <SaveIcon/>, name: 'Save'},
    {icon: <PrintIcon/>, name: 'Print'},
    {icon: <ShareIcon/>, name: 'Share'},
    {icon: <FavoriteIcon/>, name: 'Like'},
    {icon: <Image/>, name: 'Add Image'},
];


const CreateBlog = () => {

    const [blog, setBlog] = useState('');
    const [val, setVal] = useState([]);
    const [imageData, setImageData] = useState(null);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);
    const [direction, setDirection] = React.useState('right');

    const handleVisibility = () => {
        setHidden((prevHidden) => !prevHidden);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleBlog = () => {

    }

    useEffect(() => {

    }, [])


    const handleChange = value => {
        setVal(value)
    }

    const handleChangeImage = event => {
        setImageData(URL.createObjectURL(event.target.files[0]))
    }
    // console.log(val)
    // console.log(imageData)


    const formik = useFormik({});


    const modules = {
        toolbar: [
            [{'header': '1'}, {'header': '2'}, {'font': []}],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{'list': 'ordered'}, {'list': 'bullet'},
                {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            ['clean']
        ]
    }

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ]

    const options = [
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'},
        {value: 'Red', label: 'Red'},
        {value: 'Blue', label: 'Blue'},
        {value: 'Java', label: 'Java'}
    ]

    const MyComponent = () => (
        <Select
            instanceId={options.map(i => i.label)}
            isMulti
            name="colors"
            options={options}
            className="basic-multi-select mb-4"
            classNamePrefix="select"
            value={val}
            onChange={handleChange}
            styles={colourStyles}
        />
    )
    return (

        <div className='container mt-4 mb-4'>

            <h5>Enter Blog Title : </h5>
            <TextField
                name="videoUrl"
                label="Enter Video Url"
                variant="outlined"
                style={{width: '100%'}}
                required={true}
            />

            <h5 className='mt-4'>Add Tags : </h5>
            <MyComponent/>
            <h5 className='mt-4'>Add Image : </h5>
            <div className='mt-3 mb-3'>
                <TextField
                    name="courseImage"
                    variant="outlined"
                    onChange={event => handleChangeImage(event)}
                    style={{width: '25%'}}
                    required={true}
                    type='file'
                />
                {imageData ? <img src={imageData} className='img-fluid img-thumbnail mb-4 ml-5'
                                  style={{width: '600px', height: '400px'}}/>
                    : null
                }
                <Button className='text-dark bg-light float-right mb-4 mt-4' type='submit'>Post Blog</Button>
            </div>

            <h5>Add Blog Details : </h5>
            <ReactQuill
                modules={modules}
                formats={formats}
                theme={'snow'}
                value={blog}
                onChange={handleBlog}
            />

            <div className={classes.root}>
                <SpeedDial
                    ariaLabel="SpeedDial openIcon example"
                    className={classes.speedDial}
                    hidden={hidden}
                    icon={<SpeedDialIcon openIcon={<EditIcon/>}/>}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                    direction={direction}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={handleClose}
                        />
                    ))}
                </SpeedDial>
            </div>

            <Button className='text-dark bg-light float-right mb-4 mt-4' type='submit'>Post Blog</Button>

        </div>
    );
};

export default CreateBlog;
