import { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { Formik } from 'formik'
import * as Yup from 'yup'
import SearchResults from './searchresults'

const schema = Yup.object().shape({
  searchTerm: Yup.string().required()
})

const SearchBar = () => {

    const [ hits, setHits ] = useState([])

    const handleSearch = async (values) => {
    const res = await axios.get('http://localhost:3001/phrase/' + values.searchTerm)
    console.log(res)
    setHits(res.data)
    }

    return (
    <>
    <Row>
        <Col>
            <Formik validationSchema={schema}
                    onSubmit={handleSearch}
                    initialValues={{
                    searchTerm: 'Use English or Japanese characters.'
                    }}
            >
            { formik => (
                <Form noValidate onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }}>
                    <Form.Group className="my-3" controlId="formSearch">
                    <Form.Label>Search a word or kanji.</Form.Label>
                    <Form.Control type="text" name="searchTerm" value={formik.values.searchTerm} onChange={formik.handleChange} />
                    <Button className="mt-2" variant="primary" type="submit">Search</Button>
                    </Form.Group>
                </Form>
            )}
            </Formik>
        </Col>
    </Row>

    <SearchResults hits={hits} />
    </>
    )
}

export default SearchBar
