<?php 
class HomeController {
    public function index() {
        require_once 'views/home.php'; // conecta el home con el index para que la vista (home) se muestre en el index.php 
    }
}
?>