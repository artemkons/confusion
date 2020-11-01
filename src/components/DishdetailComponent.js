import React from 'react';
import { Loading } from './LoadingComponent';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, 
Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors} from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

    function RenderDish({dish}) {
        return(
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }

    function RenderComments({dishComments, dishId, postComment}){
        if(dishComments){
            const comments = dishComments.map(com=>{
                return (
                    <Fade in>
                        <li key={com.id}>
                            <p>{com.comment}</p>
                            <p>{`--${com.author},${new Intl.DateTimeFormat('en-US', {
                                year:'numeric', 
                                month:'short', 
                                day:'2-digit'}).format(new Date(Date.parse(com.date)))}`}</p>
                        </li>
                    </Fade>
                );
            });

            return (
                <div>
                    <ul className='list-unstyled'>
                        <Stagger in>
                            {comments}
                        </Stagger>
                    </ul>
                    <CommentForm dishId = {dishId} postComment= {postComment} />
                </div>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }
    
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

    class CommentForm extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                isModalOpen: false
            };
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal = () => {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit(values){
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        }

        render() {
            return (
                <div>
                    <Modal isOpen = {this.state.isModalOpen} toggle = {this.toggleModal}>
                        <ModalHeader toggle = {this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <div className="container">
                                <LocalForm onSubmit = {values => this.handleSubmit(values)}>
                                    <Row className="form-group">
                                        <Label htmlFor="rating" xs = {12}>Rating</Label>
                                        <Col>
                                            <Control.select model=".rating" id="rating" name="rating"
                                            className="form-control">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="author" xs = {12}>Your name</Label>
                                        <Col>
                                            <Control.text model=".author" id="author" name="author" placeholder="Your name" 
                                            className="form-control"
                                            validators={{
                                                minLength: minLength(3), maxLength: maxLength(15)
                                            }}/>
                                            <Errors
                                                className="text-danger"
                                                model=".author"
                                                show="touched"
                                                messages={{
                                                    minLength: 'The author field should at least be three characters long.',
                                                    maxLength: 'The author field should be less than or equal to 15 characters.'
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="comment" xs = {12}>Comment</Label>
                                        <Col>
                                            <Control.textarea model=".comment" id="comment" name="comment" rows="6"
                                            className="form-control"/>
                                        </Col>
                                    </Row>
                                    <Button type="submit" color="primary">Submit</Button>
                                </LocalForm>
                            </div>
                        </ModalBody>
                    </Modal>
                    <Button outline onClick={this.toggleModal}>
                        <i className="fa fa-pencil"></i> Submit Comment
                    </Button>
                </div>
            );
        }
    }

    const DishDetail = props => {
        if(props.loading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish}/>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <div><h4>Comments</h4></div>
                            <RenderComments dishComments={props.comments} 
                            postComment = {props.postComment} 
                            dishId= {props.dish.id}/>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

export default DishDetail;