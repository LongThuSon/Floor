import { Chair } from ".."

const Chair = (props : Chair) => {
    return (
        <div
                className="chair"
                style={{
                    position: "absolute",
                    top: `${props.top}`,
                    left: `${props.left}`,
                }}
            >
            </div>
    )
}
export default Chair