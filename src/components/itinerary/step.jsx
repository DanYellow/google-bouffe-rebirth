import { useTranslation } from 'react-i18next';

/* eslint-disable */
const Step = styled.div`
    * {
        font-size: 0.9rem;
    }
    b {
        font-weight: normal;
    }
`;
/* eslint-enable */

export default props => {
    const { t } = useTranslation();
    const { instructions, distance, duration } = props;
    return (
        <Step>
            <>
                <p
                    dangerouslySetInnerHTML={{
                        __html: instructions,
                    }}
                />
                <section className="infos">
                    <p>
                        {t('distance')}: {distance.text}
                    </p>
                    <p>
                        {t('time')}: {duration.text}
                    </p>
                </section>
            </>
        </Step>
    );
};
