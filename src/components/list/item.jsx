import { NavLink } from 'react-router-dom';

// import { useTranslation } from 'react-i18next';

const Item = styled.li`
    a {
        padding: 15px 18px;
        text-decoration: none;
        color: inherit;
        display: block;

        &:hover {
            background-color: #d8c307;
        }
    }

    h3 {
        font-size: 1.3rem;
        font-weight: normal;
        margin-bottom: 4px;
    }
    p {
        font-size: 0.85rem;
        font-weight: lighter;
    }
`;

export default props => {
    const { title, address } = props;

    return (
        <Item>
            <NavLink to="/" activeClassName="selected">
                <h3>{title}</h3>
                <p>{address}</p>
            </NavLink>
        </Item>
    );
};
