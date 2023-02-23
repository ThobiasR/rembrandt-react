import Alert from 'react-bootstrap/Alert'

export default function Error(props) {
  const { title, message, show, setShow } = props;

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{title}</Alert.Heading>
        <p>
          {message}
        </p>
      </Alert>
    );
  }

  return (<></>);
}