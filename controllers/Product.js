import product from "../models/ProductModel.js";


export const getproduct = async(req, res) => {
    try {
        const response = await product.findAll({
            attributes:['name','price','image_product','deskripsi','kotaAsal','bandaraAsal','kotaTujuan','bandaraTujuan','idCountryAsal', 'idCountryTujuan','typeFlight','typeTrip','timeGo','timeBack']
        });
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

export const getproductById = async(req, res) => {
    const { id } = req.params;
    const Product = await product.findOne({
        where: { id: id },
    });
    res.json(Product);
}

export const createproduct = async(req, res) => {
    const { name, price, image_product, deskripsi, kotaAsal, bandaraAsal, kotaTujuan, bandaraTujuan, idCountryAsal, idCountryTujuan, typeFlight, typeTrip, timeGo, timeBack} = req.body;
    if(req.user.role !== "admin") {
        return res.status(400).json({
            success: false,
            message: "Kamu gak bisa nambah tiket dengan role member",
        });
    }
    try {
        await product.create({
            name: name, 
            price: price, 
            image_product: image_product,
            deskripsi: deskripsi, kotaAsal: kotaAsal, bandaraAsal,kotaTujuan: kotaTujuan, bandaraTujuan: bandaraTujuan, idCountryAsal: idCountryAsal, idCountryTujuan: idCountryTujuan, typeFlight: typeFlight, typeTrip: typeTrip, timeGo: timeGo, timeBack: timeBack,
        });
        return res.status(200).json({
            success: true,
            message: "tiket Berhasil ditambahkan",
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateproduct = async(req, res) => {
    const { id } = req.params;
    const { name, price, image_product, deskripsi, kotaAsal, bandaraAsal, kotaTujuan, bandaraTujuan, idCountryAsal, idCountryTujuan, typeFlight, typeTrip, timeGo, timeBack} = req.body;
    if(req.user.role !== "admin" ) {
        return res.status(400).json({
            success: false,
            message: "Kamu gak bisa update data product dengan role member",
        });
    }
        try {
            await product.update(
                { 
                  name: name, 
                  price: price, 
                  image_product: image_product,
                  deskripsi: deskripsi, kotaAsal: kotaAsal, bandaraAsal,kotaTujuan: kotaTujuan, bandaraTujuan: bandaraTujuan, idCountryAsal: idCountryAsal, idCountryTujuan: idCountryTujuan, typeFlight: typeFlight, typeTrip: typeTrip, timeGo: timeGo, timeBack: timeBack,
                },
                {
                where: { id: id},
                }
            );
            return res.status(200).json({
                success: true,
                message: "product Berhasil diupdate",
            });
        } catch (error) {
            console.log(error);
        }
}

export const deleteproduct = async(req, res) => {
    const { id } = req.params;
    const dataBeforeDelete = await product.findOne({
    where: { id: id },
    });
    if(req.user.role !== "admin" ) {
        return res.status(400).json({
            success: false,
            message: "Kamu gak bisa mengakses ini",
        });
    }
    const parsedDataProfile = JSON.parse(JSON.stringify(dataBeforeDelete));

    if (!parsedDataProfile) {
        return res.status(400).json({
            success: false,
            message: "product doesn't exist or has been deleted!",
        });
    }

    await product.destroy({
        where: { id },
    });

    return res.status(200).json({
        success: true,
        message: "Delete Data Successfully",
    });
}
    