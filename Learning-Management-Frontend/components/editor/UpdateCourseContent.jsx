import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import {TextField} from "@material-ui/core";
import PublishIcon from '@material-ui/icons/Publish';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddBox';
import Select from 'react-select';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CourseService from "../../auth/course.service";


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        },
    },
    button: {
        margin: theme.spacing(1)
    }
}))

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

function CreateCourseContent({id}) {

    const classes = useStyles();
    let toastId = React.useRef(null);
    const [updatedCourse, setUpdatedCourse] = useState({})
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isClearable, setIsClearable] = useState(true)
    const [category, setCategory] = useState([])
    const [topic, setTopic] = useState([])
    const [selectedCategory, setSelectedCategory] = useState({})
    const [selectedTopic, setSelectedTopic] = useState({})
    const [imageFile, setImageFile] = useState({});
    const [previewImage, setPreviewImage] = useState(null);
    const [course, setCourse] = useState({
        courseName: '',
        overview: {courseOverview: '', learningFromThisCourse: '', eligibleForThisCourse: ''}
    })
    const [section, setSection] = useState([{
        sectionName: '',
        sectionOverview: '',
        videoContents: [{
            videoName: '', videoUrl: ''
        }]
    }])

    useEffect(() => {
        const courseDetails = async () => {
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/course/api/show-one/${id}`)
                .then(response => response.json())
                .then(data => setUpdatedCourse(data))
            setLoading(false);
        }
        setSection(p => [...p, updatedCourse.sections])
        courseDetails().then(r => r)
    }, [id])
    console.log("UPDATED COURSE", updatedCourse.sections)

    useEffect(() => {
        const categoryData = async () => {
            setLoading(true)
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/category/api/find-all`)
                .then(response => response.json())
                .then(data => setCategory(data))
            setLoading(false)
        }

        const topicData = async () => {
            setLoading(true)
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/topic/api/find-all-topic-by-category/${selectedCategory?.value}`)
                .then(response => response.json())
                .then(data => setTopic(data))
            setLoading(false)
        }
        categoryData().then(r => r);
        topicData().then(r => r);

    }, [selectedTopic, selectedCategory])

    const categoryOptions = category.map((item) => ({
        'value': item?.name, 'label': item?.name, 'id': item?.id
    }))

    const topicOptions = topic.map((item) => ({
        'value': item?.name, 'label': item?.name, 'id': item?.id
    }))


    const handleOnChangeSelectedCategory = e => {
        setSelectedCategory(e)
        console.log(selectedCategory)
    }

    const handleOnChangeSelectedTopic = e => {
        setSelectedTopic(e)
        console.log(selectedTopic)
    }

    const handleChangeCourseInput = (event) => {
        const values = {...course}
        values.courseName = event.target.value
        setCourse(values)
    }
    const handleChangeCourseOverviewInput = (event) => {
        const values = {...course}
        values.overview[event.target.name] = event.target.value
        setCourse(values)
    }
    const handleChangInput = (index, event) => {
        const values = [...section];
        values[index][event.target.name] = event.target.value;
        setSection(values);
    }

    const handleChangVideoInput = (index, i, event) => {
        const values = [...section];
        values[index].videoContents[i][event.target.name] = event.target.value;
        setSection(values);
        console.log(index, event.target.name)
    }

    const handleChangeImage = event => {
        setImageFile(event.target.files[0])
        setPreviewImage(window.URL.createObjectURL(event.target.files[0]))

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const notify = (e) => {
            if (!toast.isActive(toastId.current)) {

                toastId.current = toast(e);
            }

        }

        function displayToast(e, color) {
            if (!toast.isActive(toastId)) {
                console.log("Displaying Toast");
                toastId = toast(e, {
                    closeOnClick: true,
                    toastId: "my_toast",
                    style: {background: `${color}`, color: 'white'},
                    autoClose: true,
                    closeButton: false,
                });
            } else {
                console.log("Toast already active");
            }

        }

        const sections = [...section]

        CourseService.publishCourseImage(imageFile).then((response) => {
            const courseImage = response;
            const courseWithImage = {...course, courseImage}
            const courseDetails = {...courseWithImage, sections}
            CourseService.publishCourse(courseDetails, selectedTopic?.id)
                .then(r => displayToast("Course has been published!", 'green'))
                .catch((error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setLoading(false);
                    setMessage(resMessage);
                    displayToast(message, 'red');
                })
        })
            .catch(e => alert(e));
    }
    const handleRemoveFields = (index) => {
        const values = [...section];
        if (index > 0) values.splice(index, 1)
        setSection(values)

    }
    const handleRemoveVideoFields = (index, i) => {
        const values = [...section];
        if (i > 0) values[index].videoContents.splice(index, 1)
        setSection(values)


    }
    const handleAddFields = () => {
        setSection((prevState => (
            [...prevState, {
                videoContents: [{videoName: '', videoUrl: ''}]
            }]
        )))

    }
    const handleAddVideoFields = (i) => {
        setSection(prev => {
            const updatedSection = {
                ...prev[i],
                videoContents: [
                    ...prev[i].videoContents,
                    {videoName: '', videoUrl: ''},
                ],
            };
            return prev.map((section, index) => {
                return index === i ? updatedSection : section;
            });
        })
    }

    return (
        <div className='container mb-5 mt-5'>
            <div className='select-box ml-5'>
                <h5>Select Category For Your Course</h5>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="colors"
                    options={categoryOptions}
                    isClearable={isClearable}
                    styles={colourStyles}
                    onChange={(e) => handleOnChangeSelectedCategory(e)}
                    required
                />
                &nbsp;
                &nbsp;
                {selectedCategory?.value ?
                    <>
                        <h5>Select {selectedCategory?.value} Topic For Your Course</h5>
                        <Select
                            name="colors"
                            options={topicOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            styles={colourStyles}
                            isClearable={isClearable}
                            onChange={(e) => handleOnChangeSelectedTopic(e)}
                            required={true}
                        />
                    </>

                    : null}

                &nbsp;
                &nbsp;
            </div>

            <div className='ml-5 mt-3'>
                <TextField
                    name="imageFile"
                    variant="outlined"
                    onChange={event => handleChangeImage(event)}
                    style={{width: '25%'}}
                    required={true}
                    type='file'
                />
                {previewImage ? <img src={previewImage} className='img-fluid img-thumbnail mb-4 ml-5'
                                     style={{width: '600px', height: '400px'}}/>
                    : null
                }

            </div>
            <div className='row'>
                <Container>
                    <form className={classes.root} onSubmit={handleSubmit}>
                        <h5 className='mb-0 mt-3 ml-2 mb-2'>
                            CREATE COURSE
                        </h5>
                        <TextField
                            name="courseName"
                            label="Enter Course Name"
                            variant="outlined"
                            value={course.courseName}
                            onChange={event => handleChangeCourseInput(event)}
                            style={{width: '85%'}}
                            required={true}
                        />
                        <TextField
                            name="courseOverview"
                            label="Enter Course Overview"
                            variant="outlined"
                            value={course.overview.courseOverview}
                            onChange={event => handleChangeCourseOverviewInput(event)}
                            style={{width: '85%'}}
                            required={true}
                        />

                        <TextField
                            name="learningFromThisCourse"
                            label="Learning From This Course"
                            variant="outlined"
                            value={course.overview.learningFromThisCourse}
                            onChange={event => handleChangeCourseOverviewInput(event)}
                            style={{width: '85%'}}
                            required={true}
                        />

                        <TextField
                            name="eligibleForThisCourse"
                            label="Eligible For This Course"
                            variant="outlined"
                            value={course.overview.eligibleForThisCourse}
                            onChange={event => handleChangeCourseOverviewInput(event)}
                            style={{width: '85%'}}
                            required={true}
                        />

                        <h5 className='mb-0 mt-3 ml-2'>
                            CREATE SECTION AND VIDEOS
                        </h5>
                        {section.map((sectionItem, index) => (
                            <div key={index}>
                                <h5 className='mb-0 mt-3 ml-2'> Section Details - {index + 1}</h5>
                                <TextField
                                    name="sectionName"
                                    label="Enter Section Name"
                                    variant="outlined"
                                    value={sectionItem?.sectionName || ''}
                                    onChange={event => handleChangInput(index, event)}
                                    style={{width: '85%'}}
                                    required={true}
                                />

                                {index !== 0 ?
                                    <IconButton onClick={() => handleRemoveFields(index)}
                                                style={{color: "#9e0000", outline: "none"}}>
                                        <RemoveIcon style={{fontSize: 30}}/>
                                    </IconButton> : null
                                }
                                <IconButton onClick={() => handleAddFields()}
                                            style={{color: "#000b6b", outline: "none"}}>
                                    <AddIcon style={{fontSize: 30}}/>
                                </IconButton>
                                <TextField
                                    name="sectionOverview"
                                    label="Enter Section Overview"
                                    variant="outlined"
                                    value={sectionItem?.sectionOverview || ''}
                                    onChange={event => handleChangInput(index, event)}
                                    style={{width: '85%'}}
                                    required={true}
                                />


                                {sectionItem?.videoContents?.map((videoItem, i) => (
                                    <div key={i}>
                                        <h6 className='mb-2 mt-3 ml-2'> Lecture Details - {i + 1}</h6>
                                        <TextField
                                            name="videoName"
                                            label="Enter Video Name"
                                            variant="outlined"
                                            value={videoItem.videoName}
                                            onChange={event => handleChangVideoInput(index, i, event)}
                                            style={{width: '65%'}}
                                            required={true}
                                        />
                                        {i !== 0 ?
                                            <IconButton onClick={() => handleRemoveVideoFields(index, i)}
                                                        style={{color: "#9e0000", outline: "none"}}>
                                                <RemoveIcon style={{fontSize: 30}}/>
                                            </IconButton> : null
                                        }

                                        <IconButton onClick={() => handleAddVideoFields(index)}
                                                    style={{color: "#000b6b", outline: "none", fontSize: 40}}>
                                            <AddIcon style={{fontSize: 30}}/>
                                        </IconButton>
                                        <TextField
                                            name="videoUrl"
                                            label="Enter Video Url"
                                            variant="outlined"
                                            value={videoItem.videoUrl}
                                            onChange={event => handleChangVideoInput(index, i, event)}
                                            style={{width: '30%'}}
                                            required={true}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                        <Button
                            className='float-md-right'
                            variant='contained'
                            color='primary'
                            type='submit'
                            endIcon={<PublishIcon/>}
                        >
                            PUBLISH
                        </Button>
                    </form>
                </Container>
                <ToastContainer/>
            </div>
        </div>

    );
}

export default CreateCourseContent;
