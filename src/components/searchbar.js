import { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { Formik } from 'formik'
import * as Yup from 'yup'
import SearchResults from './searchresults'
import Notification from './notification'

const schema = Yup.object().shape({
  searchTerm: Yup.string().required()
})

const SearchBar = () => {

    const [ hits, setHits ] = useState([])
    const [ alertText, setAlertText ] = useState(null)

    const handleSearch = async (values) => {

        setAlertText(null)

        const res = values.searchType === 'kanji' ? 
            await axios.get('http://localhost:3001/kanji/' + values.searchTerm) 
        :   await axios.get('http://localhost:3001/phrase/' + values.searchTerm) 

        
        if((values.searchType === 'word' && res.data.length === 0) || (values.searchType === 'kanji' && !res.data.found))
            setAlertText("No results found.")

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
                    searchTerm: 'Use English or Japanese characters.',
                    searchType: 'kanji'
                    }}
            >
            { formik => (
                <Form noValidate onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }}>
                    <Form.Group className="my-3" controlId="formSearch">
                    <Form.Label>Search a word or kanji.</Form.Label>
                    <Form.Control type="text" name="searchTerm" value={formik.values.searchTerm} onChange={formik.handleChange} />
                    <Button className="mt-2" variant="primary" type="submit">Search</Button>
                    <Form.Check defaultChecked className="mx-4" inline type="radio" value="kanji" label="Kanji" onChange={formik.handleChange} name="searchType" />
                    <Form.Check className="mx-4" inline type="radio" value="word" label="Word" onChange={formik.handleChange} name="searchType" />
                    </Form.Group>
                </Form>
            )}
            </Formik>
        </Col>
    </Row>

    <Notification msg={alertText} flavour="danger" />

    <SearchResults hits={hits} />
    </>
    )
}

export default SearchBar
