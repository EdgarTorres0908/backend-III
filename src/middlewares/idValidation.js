export const idValidation = (req, res, next) => {
    if (req.body.id && req.body.id !== req.params.productId) {
       
        res.status(404).json({ msg: 'El ID del producto no puede ser cambiado' });
    } else {
       
        next();
    }
}