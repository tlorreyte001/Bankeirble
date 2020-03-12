import React from "react";
import {Row, Col} from "react-bootstrap";
import { GlobalTable } from "../components/GlobalTable.js";
import { AddLoan } from "../components/AddLoan.js";
import Container from "@material-ui/core/Container";

export class Dashboard extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col><GlobalTable/></Col>
                    <Col><AddLoan/></Col>
                </Row>
            </Container>
        );
    }
}