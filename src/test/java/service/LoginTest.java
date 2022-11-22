package service;


import DB.HibernateController;
import DB.User;
import com.fasterxml.jackson.annotation.JacksonInject;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.engine.spi.SessionDelegatorBaseImpl;
import org.hibernate.query.Query;
import org.testng.annotations.Test;
import java.io.ObjectInputStream;
import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import static org.testng.Assert.*;

public class LoginTest {



    @Test
    public static void testGetUser() {
        HibernateController hibernateController =
                new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg");
        SessionFactory sessionFactory = hibernateController.getSessionFactory();
        Session session = sessionFactory.openSession();

        JacksonInject.Value user;

        Transaction readTransaction = session.beginTransaction();

        CriteriaBuilder cb = session.getCriteriaBuilder();
        CriteriaQuery<User> cr = cb.createQuery(User.class);
        Root<User> root = cr.from(User.class);
        cr.select(root);
        String usertoFind = "";
        cr.select(root).where(cb.like(root.get("username"), usertoFind));

        Query<User> query = session.createQuery(cr);
        List<User> results = query.getResultList();



        if(results.toString().equals("Melman")){
            System.out.println("True");
        }
        else {
            System.out.print("False");
        }
    }
}