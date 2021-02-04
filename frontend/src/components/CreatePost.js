import { Form, Input, Button, Checkbox, Select, Alert } from 'antd';
import Wrapper from "./Wrapper";
import TextArea from 'antd/lib/input/TextArea';
import React, {useState} from 'react';

import axios from 'axios';
import {Link} from "react-router-dom";
import apiCore from './apiCore';
import postPublicacion from './apiCore';

const CreatePost = () => {

  let usuariobj = localStorage.getItem("usuario")
  let usuario = JSON.parse(usuariobj)

  const [monedas, setCount] = useState(0);

  const onFinish = (values) => {
    return fetch(
      
      `http://localhost:4000/api/publicacion/createpublicacion`,
      {
          crossDomain:true,
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(values),
      })
    .then(response => {
      console.log(response)
      const money = usuario.coins - monedas;
      console.log(monedas)
      axios.put(`http://localhost:4000/api/Auth/${usuario._id}`, 
      {
        coins: money,
      }).then(response => {
          console.log(response); 
      })
      window.location.reload();
      window.location.href="/PublicacionRealizada";
      return response.json()
  })
  .catch(err => console.log(err));
  };
  

  // Sección para los tags, que van hacer cursos que puede elegir el usuario
  const { Option } = Select;
  const cursos = ['Lenguaje','Literatura','Historia','Geografía','Psicología','Filosofía','Aritmetica','Álgebra','Trigonometría','Geometría','Química','Física','Biología','Anatomía','Ingles'];
  const tags =[]
  for (let i = 0; i < cursos.length; i++) {
    tags.push(<Option key={cursos[i]}>{cursos[i]}</Option>);
  }

  return (     
    
    <Wrapper>
      <div>
          <h2>Crear Publicación</h2>
      </div>  
      <Form 
        name="create_login"
        className="create-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        {/* Sección para el titulo */}
        <Form.Item
          name="tittle"
          className="create-form-input"
          rules={[
            {
              required: true,
              message: '¡Escribe tu titulo!',
            },
          ]}>
        <Input 
        maxLength="80"
        placeholder="Titulo" />
        </Form.Item>
        <Form.Item
          name="comment"
          className="create-form-input"
          rules={[
            {
              required: true,
              message: '¡Escribe tu publicación!',
            },
          ]}>
          {/* Sección para la descripción */}          
          <TextArea
          placeholder="Describe tu publicación usando menos de 1500 caracteres"
          rows="12"
          maxLength="1500"
          />
        </Form.Item>
        {/* Sección para las monedas */}
        <div className="coins">
        <p>Modenas:</p>
        <Form.Item 
          name="coins"
          rules={[
            {
              required: true,
              message: '¡Inserte una cantidad de monedas válidas!',
            },
            () => ({
              validator(rule, value) {
                if (value <= usuario.coins) {
                  setCount(value)
                  return Promise.resolve();
                }
                return Promise.reject('No tiene esa cantidad de monedas disponibles ');
              },
            }),
          ]}>
          <Input
            type="number"
            name="coins"
            placeholder="Ingrese sus Monedas"
          />
        </Form.Item>        
        <i>Cantidad de Monedas Disponible: {usuario.coins}</i>
        </div>
        <div className="tags">
        <p>Tags: </p>
        {/* Sección para los tags */}
        <Form.Item name="tags" className="tags__select">
        <Select
          mode="multiple"
          allowClear
          placeholder="Selecciona tus tags"
          maxTagCount={3}
        >
          {tags}
        </Select>
        </Form.Item>
        </div>
        <Form.Item>
          <Button   type="primary" htmlType="submit" className="create-form-button"  >
            Publicar
          </Button>
        </Form.Item>
      </Form>
      
    </Wrapper> 
      
    );
};

export default CreatePost;