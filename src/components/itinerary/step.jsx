/* eslint-disable */
const Step = styled.div``;
/* eslint-enable */

export default props => {
    const { instruction } = props;
    return (
        <Step>
            <>
                <p
                    dangerouslySetInnerHTML={{
                        __html: instruction.instructions,
                    }}
                />
                <section className="infos">
                    <p>Distance : {instruction.distance.text}</p>
                    <p>Temps : {instruction.duration.text}</p>
                </section>
            </>
        </Step>
    );
};
