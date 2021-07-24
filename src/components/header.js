/* eslint-disable react/react-in-jsx-scope */
import { Row, Col, Image } from "react-bootstrap"
import UserProfile from "./users/userprofile"
import logo from "../logo.png"

const Header = () => (
    <Row>
        <Col className="my-2" xs={8} sm={6} lg={3}>
            <Image src={logo} fluid />
        </Col>
        <Col className="py-3 mt-1" xs={{ span: 3, offset: 1 }} sm={{ span: 2, offset: 4 }} lg={{ span: 1, offset: 8 }} >
            <UserProfile badge={true} />
        </Col>
    </Row>
)

export default Header