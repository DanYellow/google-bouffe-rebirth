/* eslint-disable */
const Step = styled.div``;
/* eslint-enable */

export default props => {
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
                    <p>Distance : {distance.text}</p>
                    <p>Temps : {duration.text}</p>
                </section>
            </>
        </Step>
    );
};
