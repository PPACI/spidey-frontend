export default function(err) {
    return err.toString().toLowerCase().replace('error:', '');
}