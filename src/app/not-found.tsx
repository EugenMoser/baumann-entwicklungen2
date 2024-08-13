//todo hier noch eine Seite erstellen
interface NotFoundProps {}

function NotFound({}: NotFoundProps): JSX.Element {
  return (
    <>
      <h1>Seite nicht gefunden</h1>
      <p>Es konnten keine Seiten geladen werden</p>
    </>
  );
}

export default NotFound;
