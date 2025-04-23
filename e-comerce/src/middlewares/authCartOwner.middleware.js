export const authCartOwner = (req, res, next) => {
    const { cid } = req.params;
    if (!req.user.cart || req.user.cart.toString() !== cid) {
        return res.status(403).json({ status: "error", msg: "No tienes permiso para acceder o modificar carritos ajenos" });
    }
    next();
};