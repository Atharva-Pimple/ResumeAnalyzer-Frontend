import React from 'react';
import { Card, Container, Row, Col, Button, Image } from 'react-bootstrap';
import { deleteData, getUser, removeToken } from '../services/userServices';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export function UserProfile (){

    const navigate = useNavigate();

    const [user, setUserData] = useState();

    async function getUserData() {
        try{
            const response = await getUser();
            if (response.status===200){
                console.log(response);
                setUserData(response.data);
            }
            else{
                console.log("error");   
            }  
        }
        catch(error){
            console.log(error);            
        }    
    }

    useEffect(() =>{
        getUserData()
        
    },[])

    if (!user) {
    return (
      <Container className="py-5 text-center">
        <h5>Loading profile...</h5>
      </Container>
    );
    }

    async function handleDelete(){

        try{
            const response = await deleteData();
            if(response.status===200){
                removeToken()
                toast.success("your account deleted succesfully");
                navigate('/');
            }
            else{
                toast.error("something went wrong");
            }

        } catch(error){
            console.log(error);
        }
    }

  return (
    <Container style={{marginTop:"100px"}} className="py-5 d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: '600px', borderRadius: '1rem', boxShadow: '0 0 15px rgba(0,0,0,0.1)' }}>
        <Card.Body>
            <h4 className="mb-4 text-center">User Profile</h4>

            <Row className="mb-3">
                <Col xs={4}><strong>Name</strong></Col>
                <Col xs={8}>- {user.data.username}</Col>
            </Row>

            <Row className="mb-3">
                <Col xs={4}><strong>Email</strong></Col>
                <Col xs={8}>- {user.data.email}</Col>
            </Row>

            <Row className="mb-3">
                <Col xs={4}><strong>Bio</strong></Col>
                <Col xs={8}>- {user.bio || "No bio provided yet."}</Col>
            </Row>

            <div className="text-center mt-4">
                <Button onClick={handleDelete} variant="dark" size="sm">delete Profile</Button>
                

            </div>
        </Card.Body>

      </Card>
    </Container>
  );
};



