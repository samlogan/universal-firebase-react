import { isDebug, trackingID } from '../../config/app';

const createAnalyticsSnippet = id =>
  `<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '${id}', 'auto');
ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAS2b4JvlNh7f4LgPjLvabZhfYt2VdEVuM&libraries=places,geometry"></script>
<script src="https://js.stripe.com/v3/"></script>
`;

const createAppScript = () => '<script async type="text/javascript" charset="utf-8" src="/assets/app.js"></script>';

const createTrackingScript = () => {
  if (trackingID) return null;
  return createAnalyticsSnippet(trackingID);
};

const createStylesheets = () => {
  if (isDebug) {
    return (
      `<link rel="shortcut icon" href="/assets/images/favicon.png" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:600|Roboto:400,400i,700,700i" />`
    );
  }
  return (
    `<link rel="shortcut icon" href="/assets/images/favicon.png" />
    <link rel="stylesheet" href="/assets/styles.css" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:600|Roboto:400,400i,700,700i" />`
  );
};

export { createAppScript, createTrackingScript, createStylesheets };
