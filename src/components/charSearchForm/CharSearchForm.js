import {Formik, Form, Field, ErrorMessage, useField, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from 'yup';
import useMarvelService from "../../services/MarvelService";
import {useState} from "react";
import {Link} from "react-router-dom";

const CharSearchForm = () => {

    // const handleOnSubmit = (values) => {
    //     console.log(values)
    // }
    const [char, setChar] = useState(null);
    console.log(char)

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const {getCharacterByName, loading, error} = useMarvelService();

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage/></div> : null;
    const results = !char ? null : char.length > 0 ? <div>
        Персонаж найден
        <br/>
        <Link to={`/characters/${char[0].id}`}>Ссылка на страницу с персонажем</Link>
    </div> : <div>Такого персонажа не существует</div>;

    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(2, 'Минимум 2 символа!')
                        .required('Обязательное поле'),
                })}
                onSubmit={(values) => {
                    getCharacterByName(values.name)
                        .then(res => {
                            onCharLoaded(res);
                            console.log(res)
                        })
                        .catch(err => {
                            console.log(err)
                        })

                }}>
                <Form className="form">
                    <h2>Поиск персонажа</h2>
                    <label htmlFor="name">Имя персонажа имя</label>
                    <br/>
                    <Field
                        id="name"
                        name="name"
                        type="text"
                    />
                    <br/>
                    <FormikErrorMessage className="error" name="name" component="div"/>
                    <br/>
                    <button type="submit">Отправить</button>
                    <br/>
                </Form>
            </Formik>
            {errorMessage}
            {results}
        </>

    )
}

export default CharSearchForm