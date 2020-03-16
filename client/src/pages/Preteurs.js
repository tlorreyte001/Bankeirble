import React from "react";
import {Row, Col} from "react-bootstrap";
import { GlobalTable } from "../components/GlobalTable.js";
import Container from "@material-ui/core/Container";

export class Preteurs extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col><GlobalTable/></Col>
                </Row>
            </Container>
        );
    }
}