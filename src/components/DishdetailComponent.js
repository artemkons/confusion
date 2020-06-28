import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'

    function RenderDish({dish}) {
        return(
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    function RenderComments({dishComments}){
        if(dishComments){
            const comments = dishComments.map(com=>{
                return (
                    <li key={com.id}>
                        <p>{com.comment}</p>
                        <p>{`--${com.author},${new Intl.DateTimeFormat('en-US', {
                            year:'numeric', 
                            month:'short', 
                            day:'2-digit'}).format(new Date(Date.parse(com.date)))}`}</p>
                    </li>
                );
            });
            return comments;
        }
        else {
            return(
                <div></div>
            );
        }
    }

    const DishDetail = props => {
        if(props.dish) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish}/>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <div><h4>Comments</h4></div>
                            <div>
                                <ul className="list-unstyled">
                                    <RenderComments dishComments={props.dish.comments}/>
                                </ul>
                            </div>
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