import { Link, useLoaderData } from "react-router-dom";
import {
    Breadcrumb,
    Button,
    FloatingLabel,
    Form,
    Stack,
    Table,
} from "react-bootstrap";

export const ListPersonne = () => {
    const personnes = useLoaderData();

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                    Library
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>

            <div className="bgc-white bd bdrs-3 p-20 mB-20 shadow-sm">
                <Stack
                    direction="horizontal"
                    className="align-items-center mb-4"
                >
                    <h4 className="c-grey-900  me-auto ">Liste des scouts</h4>
                    <Button>Ajouter un scout</Button>
                </Stack>
                <Form.Control size="lg" type="text" placeholder="Password" />
                <Table striped className="mt-4">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nom</th>
                            <th>Identifiant</th>
                            <th>Date naissance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personnes.map((personne) => (
                            <tr key={personne.id}>
                                <td>{personne.id}</td>
                                <td>
                                    <div className="peer mR-10">
                                        <img
                                            className="w-2r bdrs-50p"
                                            src="https://randomuser.me/api/portraits/men/10.jpg"
                                            alt=""
                                        />
                                    </div>
                                    {personne.nom} {personne.prenom}
                                </td>
                                <td>{personne.code}</td>
                                <td>{personne.date_naissance}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};
